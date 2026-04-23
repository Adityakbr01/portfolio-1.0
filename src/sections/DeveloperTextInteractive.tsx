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

function parseRgba(rgba: string): [number, number, number, number] {
  const m = rgba.match(/[\d.]+/g);
  if (!m || m.length < 3) return [255, 119, 34, 1];
  return [
    parseFloat(m[0]),
    parseFloat(m[1]),
    parseFloat(m[2]),
    m[3] !== undefined ? parseFloat(m[3]) : 1,
  ];
}

function shadowColor(rgba: string, depthAlpha = 0.5): string {
  const [r, g, b] = parseRgba(rgba);
  return `rgba(${Math.max(0, r * 0.22)},${Math.max(0, g * 0.22)},${Math.max(0, b * 0.22)},${depthAlpha})`;
}

export default function DeveloperTextInteractive({
  rippleRadius = 220,
  rippleAmplitude = 18,
  rippleFrequency = 0.045,
  rippleSpeed = 2.8,
  mouseSmoothing = 0.08,
  rgba = "rgba(255, 119, 34, 1)",
  fillText = "DEVELOPER",
  xFraction = 0.5,
}: DeveloperTextInteractiveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Single ref for all live config — zero re-renders, zero stale closures
  const cfg = useRef({
    rippleRadius,
    rippleAmplitude,
    rippleFrequency,
    rippleSpeed,
    mouseSmoothing,
    rgba,
    xFraction,
  });
  useEffect(() => {
    cfg.current = {
      rippleRadius,
      rippleAmplitude,
      rippleFrequency,
      rippleSpeed,
      mouseSmoothing,
      rgba,
      xFraction,
    };
  }, [
    rippleRadius,
    rippleAmplitude,
    rippleFrequency,
    rippleSpeed,
    mouseSmoothing,
    rgba,
    xFraction,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    console.log("DeveloperTextInteractive: Initializing WebGL canvas", {
      fillText,
    });

    // ── WebGL init ────────────────────────────────────────────────────────────
    const glOpts: WebGLContextAttributes = {
      alpha: true,
      premultipliedAlpha: true, // Often more stable against black-screen issues on hardware acceleration
      antialias: false,
      preserveDrawingBuffer: true,
    };
    const gl = canvas.getContext("webgl", glOpts);
    if (!gl) {
      console.error(
        "[WebGL Debug] Failed to get WebGL context. Hardware acceleration might be disabled or fallback failed.",
      );
      return;
    }

    console.log(
      "[WebGL Debug] Context acquired. Requested:",
      glOpts,
      "Actual:",
      gl.getContextAttributes(),
    );

    // Utility to trace where black screens originate
    const checkGLError = (step: string) => {
      const err = gl.getError();
      if (err !== gl.NO_ERROR)
        console.error(`[WebGL Debug] Error at ${step}:`, err);
    };

    // Disabled GL_BLEND to prevent alpha-channel multiplication issues (A*A) which can create opaque black backgrounds.
    // Since we're drawing a fullscreen quad over the canvas, we can just output the texture's premultiplied pixels directly.
    gl.disable(gl.BLEND);
    gl.clearColor(0, 0, 0, 0); // Transparent background

    checkGLError("init");

    const compileShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };
    const prog = gl.createProgram()!;
    const vertShader = compileShader(gl.VERTEX_SHADER, VERT_SRC);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vertShader || !fragShader) {
      console.error("Failed to compile shaders");
      return;
    }
    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1]),
      gl.STATIC_DRAW,
    );
    const aPosLoc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPosLoc);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    // Cache all uniform locations once
    const uText = gl.getUniformLocation(prog, "u_text");
    const uResolution = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRadius = gl.getUniformLocation(prog, "u_radius");
    const uAmplitude = gl.getUniformLocation(prog, "u_amplitude");
    const uFrequency = gl.getUniformLocation(prog, "u_frequency");
    const uSpeed = gl.getUniformLocation(prog, "u_speed");

    // Upload texture sampler once — it never changes
    gl.uniform1i(uText, 0);

    // ── Texture ───────────────────────────────────────────────────────────────
    const tex = gl.createTexture()!;
    const offscreen = document.createElement("canvas");

    const uploadTexture = (img: HTMLCanvasElement) => {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    };

    const buildTexture = () => {
      const W = (canvas.width = canvas.offsetWidth);
      const H = (canvas.height = canvas.offsetHeight);

      if (W === 0 || H === 0) {
        console.warn("Canvas has zero dimensions:", { W, H });
        return;
      }

      offscreen.width = W;
      offscreen.height = H;

      const oc = offscreen.getContext("2d");
      if (!oc) {
        console.error("Failed to get 2D context from offscreen canvas");
        return;
      }

      const { rgba: color, xFraction: xf } = cfg.current;

      const fontSize = Math.round(W * 0.12);
      const cx = W * xf;
      const cy = H / 2;

      oc.clearRect(0, 0, W, H);
      oc.font = `900 ${fontSize}px Impact, 'Arial Black', sans-serif`;
      oc.textAlign = "center";
      oc.textBaseline = "middle";

      const DEPTH = 18;
      const shade = shadowColor(color);
      const midColor = shadowColor(color, 0.35);

      for (let i = DEPTH; i >= 1; i--) {
        oc.fillStyle = i / DEPTH > 0.5 ? shade : midColor;
        oc.fillText(fillText, cx + i, cy + i * 0.6);
      }

      const [r, g, b, a] = parseRgba(color);
      oc.fillStyle = `rgba(${Math.min(255, r + 80)},${Math.min(255, g + 80)},${Math.min(255, b + 80)},${Math.min(1, a * 0.45)})`;
      oc.fillText(fillText, cx - 1, cy - 1);

      oc.fillStyle = color;
      oc.fillText(fillText, cx, cy);

      uploadTexture(offscreen);
      gl.viewport(0, 0, W, H);

      // Re-upload resolution uniform immediately after resize
      gl.uniform2f(uResolution, W, H);

      console.log("Texture built and uploaded:", { W, H, fillText });
    };

    buildTexture();

    // ── Debounced resize – avoid thrashing the GPU on every pixel drag ────────
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildTexture, 120);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // ── Mouse: capture raw coords in a rAF-synced variable (no per-event math)
    // raw is written from the mousemove handler; smooth is updated in draw().
    // We store canvas rect lazily and invalidate it on resize so we never call
    // getBoundingClientRect() inside the rAF loop.
    let rect = canvas.getBoundingClientRect();
    const onRectInvalidate = () => {
      rect = canvas.getBoundingClientRect();
    };

    const raw = { x: 0.5, y: 0.5 };
    const smooth = { x: 0.5, y: 0.5 };

    const onMove = (e: MouseEvent) => {
      raw.x = (e.clientX - rect.left) / rect.width;
      raw.y = (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onRectInvalidate, { passive: true });
    window.addEventListener("scroll", onRectInvalidate, { passive: true });

    // ── Visibility: stop the rAF loop when off-screen ─────────────────────────
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    // ── Animation loop ────────────────────────────────────────────────────────
    let raf = 0;
    let lastTs = 0; // tracks real wall-clock time via performance.now()
    let frameCount = 0;

    // Cache previous uniform values to skip redundant uploads
    let prevMx = -1,
      prevMy = -1;
    let prevR = -1,
      prevAmp = -1,
      prevFreq = -1,
      prevSpd = -1;

    const draw = (ts: number) => {
      raf = requestAnimationFrame(draw);
      if (!isVisible) return;

      frameCount++;
      if (frameCount === 1) {
        console.log("Animation loop started, rendering first frame");
      }

      // Real delta avoids drift from dropped frames
      if (lastTs === 0) lastTs = ts;
      const dt = Math.min((ts - lastTs) * 0.001, 0.05); // cap at 50 ms
      lastTs = ts;

      const {
        rippleRadius: R,
        rippleAmplitude: AMP,
        rippleFrequency: FREQ,
        rippleSpeed: SPD,
        mouseSmoothing: LERP,
      } = cfg.current;

      smooth.x += (raw.x - smooth.x) * LERP;
      smooth.y += (raw.y - smooth.y) * LERP;

      gl.clear(gl.COLOR_BUFFER_BIT);

      // CRITICAL: Bind texture unit and texture before drawing
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);

      // Only re-upload uniforms that actually changed ─────────────────────────
      const mx = smooth.x;
      const my = 1.0 - smooth.y;
      if (mx !== prevMx || my !== prevMy) {
        gl.uniform2f(uMouse, mx, my);
        prevMx = mx;
        prevMy = my;
      }

      // u_time always changes
      gl.uniform1f(uTime, ts * 0.001);

      if (R !== prevR) {
        gl.uniform1f(uRadius, R);
        prevR = R;
      }
      if (AMP !== prevAmp) {
        gl.uniform1f(uAmplitude, AMP);
        prevAmp = AMP;
      }
      if (FREQ !== prevFreq) {
        // Periodically log any silent WebGL runtime errors
        if (frameCount % 120 === 0) {
          const err = gl.getError();
          if (err !== gl.NO_ERROR) {
            console.error(
              `[WebGL Debug] Error in draw loop (frame ${frameCount}):`,
              err,
            );
          }
        }

        gl.uniform1f(uFrequency, FREQ);
        prevFreq = FREQ;
      }
      if (SPD !== prevSpd) {
        gl.uniform1f(uSpeed, SPD);
        prevSpd = SPD;
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      void dt; // used only for potential future physics; suppresses lint
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("resize", onRectInvalidate);
      window.removeEventListener("scroll", onRectInvalidate);
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
