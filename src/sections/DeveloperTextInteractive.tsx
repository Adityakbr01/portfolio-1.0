"use client";
import { useEffect, useRef } from "react";

interface DeveloperTextInteractiveProps {
  rippleRadius?: number;
  rippleAmplitude?: number;
  rippleFrequency?: number;
  rippleSpeed?: number;
  mouseSmoothing?: number;
  rgba?: string;
  fillText: string;
  /**
   * Horizontal position of the text as a fraction of canvas width.
   * 0 = far left, 0.5 = center (default), 1 = far right.
   */
  xFraction?: number;
}

const VERT_SRC = `
  attribute vec2 a_pos;
  varying   vec2 v_uv;
  void main() {
    v_uv = a_pos * 0.5 + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

const FRAG_SRC = `
  precision mediump float;
  varying vec2 v_uv;

  uniform sampler2D u_text;
  uniform vec2      u_resolution;
  uniform vec2      u_mouse;
  uniform float     u_time;
  uniform float     u_radius;
  uniform float     u_amplitude;
  uniform float     u_frequency;
  uniform float     u_speed;

  void main() {
    vec2 px = v_uv * u_resolution;
    vec2 mp = u_mouse * u_resolution;

    vec2 delta = px - mp;
    float dist = length(delta);

    vec2 offset = vec2(0.0);
    if (dist < u_radius && dist > 0.5) {
      float norm     = dist / u_radius;
      float ripple   = sin(dist * u_frequency - u_time * u_speed);
      float envelope = (1.0 - norm) * (1.0 - norm);
      float strength = ripple * envelope * u_amplitude;
      offset = (delta / dist) * strength;
    }

    vec2 sampleUv = (px - offset) / u_resolution;
    sampleUv.y = 1.0 - sampleUv.y;
    vec4 texel = texture2D(u_text, sampleUv);

    gl_FragColor = texel;
  }
`;

export default function DeveloperTextInteractive({
  rippleRadius    = 220,
  rippleAmplitude = 18,
  rippleFrequency = 0.045,
  rippleSpeed     = 2.8,
  mouseSmoothing  = 0.08,
  rgba            = "rgba(255, 119, 34, 1)",
  fillText        = "DEVELOPER",
  xFraction       = 0.5,
}: DeveloperTextInteractiveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const cfg = useRef({
    rippleRadius, rippleAmplitude, rippleFrequency,
    rippleSpeed, mouseSmoothing, rgba, xFraction,
  });
  useEffect(() => {
    cfg.current = {
      rippleRadius, rippleAmplitude, rippleFrequency,
      rippleSpeed, mouseSmoothing, rgba, xFraction,
    };
  }, [rippleRadius, rippleAmplitude, rippleFrequency, rippleSpeed, mouseSmoothing, rgba, xFraction]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
    });
    if (!gl) return;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const compileShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER,   VERT_SRC));
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, FRAG_SRC));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1,  -1, 1,
       1, -1,  1,  1,  -1, 1,
    ]), gl.STATIC_DRAW);
    const aPosLoc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPosLoc);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    const uText       = gl.getUniformLocation(prog, "u_text");
    const uResolution = gl.getUniformLocation(prog, "u_resolution");
    const uMouse      = gl.getUniformLocation(prog, "u_mouse");
    const uTime       = gl.getUniformLocation(prog, "u_time");
    const uRadius     = gl.getUniformLocation(prog, "u_radius");
    const uAmplitude  = gl.getUniformLocation(prog, "u_amplitude");
    const uFrequency  = gl.getUniformLocation(prog, "u_frequency");
    const uSpeed      = gl.getUniformLocation(prog, "u_speed");

    const tex = gl.createTexture()!;
    const uploadTexture = (img: HTMLCanvasElement) => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    };

    const offscreen = document.createElement("canvas");
    const buildTexture = () => {
      const W = canvas.width  = canvas.offsetWidth;
      const H = canvas.height = canvas.offsetHeight;
      offscreen.width  = W;
      offscreen.height = H;
      const oc = offscreen.getContext("2d")!;
      oc.clearRect(0, 0, W, H);
      const fontSize = Math.round(W * 0.12);
      oc.font          = `900 ${fontSize}px Impact, 'Arial Black', sans-serif`;
      oc.textBaseline  = "middle";
      // Use xFraction from cfg so it's always current
      oc.textAlign     = "center";
      oc.fillStyle     = cfg.current.rgba;
      oc.fillText(fillText, W * cfg.current.xFraction, H / 2);
      uploadTexture(offscreen);
      gl.viewport(0, 0, W, H);
    };
    buildTexture();
    window.addEventListener("resize", buildTexture);

    const raw    = { x: 0.5, y: 0.5 };
    const smooth = { x: 0.5, y: 0.5 };
    const onMove = (e: MouseEvent) => {
      // Normalize mouse relative to this canvas element
      const rect = canvas.getBoundingClientRect();
      raw.x = (e.clientX - rect.left) / rect.width;
      raw.y = (e.clientY - rect.top)  / rect.height;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    let t   = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      t  += 0.016;

      const {
        rippleRadius: R, rippleAmplitude: AMP,
        rippleFrequency: FREQ, rippleSpeed: SPD,
        mouseSmoothing: LERP,
      } = cfg.current;

      smooth.x += (raw.x - smooth.x) * LERP;
      smooth.y += (raw.y - smooth.y) * LERP;

      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.uniform1i(uText, 0);

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, smooth.x, 1.0 - smooth.y);
      gl.uniform1f(uTime,      t);
      gl.uniform1f(uRadius,    R);
      gl.uniform1f(uAmplitude, AMP);
      gl.uniform1f(uFrequency, FREQ);
      gl.uniform1f(uSpeed,     SPD);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", buildTexture);
      window.removeEventListener("mousemove", onMove);
      gl.deleteTexture(tex);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fillText]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full select-none"
      aria-hidden
    />
  );
}