"use client";

import { useEffect, useRef } from "react";
import { animate } from "motion";

interface SmokeEffectProps {
  className?: string;
  color1?: [number, number, number]; // RGB 0-1
  color2?: [number, number, number]; // RGB 0-1
  speed?: number;
  density?: number;
  opacity?: number;
}

const VERT_SRC = `
  attribute vec2 a_pos;
  varying vec2 v_uv;
  void main() {
    v_uv = a_pos * 0.5 + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

const FRAG_SRC = `
  precision highp float;
  varying vec2 v_uv;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform float u_opacity;
  uniform float u_density;

  float random(in vec2 _st) {
      return fract(sin(dot(_st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise(in vec2 _st) {
      vec2 i = floor(_st);
      vec2 f = fract(_st);
      
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));

      vec2 u = f * f * (3.0 - 2.0 * f);

      return mix(a, b, u.x) +
             (c - a) * u.y * (1.0 - u.x) +
             (d - b) * u.x * u.y;
  }

  #define NUM_OCTAVES 5

  float fbm(in vec2 _st) {
      float v = 0.0;
      float a = 0.5;
      vec2 shift = vec2(100.0);
      mat2 rot = mat2(cos(0.5), sin(0.5),
                     -sin(0.5), cos(0.50));
      for (int i = 0; i < NUM_OCTAVES; ++i) {
          v += a * noise(_st);
          _st = rot * _st * 2.0 + shift;
          a *= 0.5;
      }
      return v;
  }

  void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy * 3.0;
      
      vec2 q = vec2(0.);
      q.x = fbm(st + 0.00 * u_time);
      q.y = fbm(st + vec2(1.0));

      vec2 r = vec2(0.);
      r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * u_time);
      r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * u_time);

      float f = fbm(st + r);

      vec3 color = mix(u_color1, u_color2, clamp((f*f)*4.0, 0.0, 1.0));
      color = mix(color, vec3(0.0, 0.0, 0.0), clamp(length(q), 0.0, 1.0));
      color = mix(color, u_color2, clamp(length(r.x), 0.0, 1.0));

      // Add soft alpha masking and multiply by unform opacity
      float alpha = (f * f * f + 0.6 * f * f + 0.5 * f) * u_opacity * u_density;
      gl_FragColor = vec4(color * alpha, alpha);
  }
`;

export default function SmokeEffect({
  className = "absolute inset-0 z-0 mix-blend-screen",
  color1 = [0.1, 0.6, 0.6],
  color2 = [0.6, 0.2, 0.8],
  speed = 1.0,
  density = 1.0,
  opacity = 1.0,
}: SmokeEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log("[SmokeEffect] Mount: Initializing SmokeEffect");
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("[SmokeEffect] Canvas ref is null");
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
    });

    if (!gl) {
      console.error("[SmokeEffect] WebGL context creation failed!");
      return;
    }
    console.log("[SmokeEffect] WebGL context created");

    // Shader Compile Utility
    const compileShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("[SmokeEffect] Shader error:", gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, VERT_SRC);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vertShader || !fragShader) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Quad buffer
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

    // Uniforms
    const uResInfo = gl.getUniformLocation(prog, "u_resolution");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uColor1 = gl.getUniformLocation(prog, "u_color1");
    const uColor2 = gl.getUniformLocation(prog, "u_color2");
    const uOpacity = gl.getUniformLocation(prog, "u_opacity");
    const uDensity = gl.getUniformLocation(prog, "u_density");

    // Initialize uniforms
    gl.uniform3f(uColor1, ...color1);
    gl.uniform3f(uColor2, ...color2);
    gl.uniform1f(uDensity, density);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;

      console.log(
        `[SmokeEffect] Resize trigger - width: ${w}, height: ${h}, dpr: ${dpr}`,
      );
      if (w === 0 || h === 0) {
        console.warn(
          "[SmokeEffect] Warning: Canvas has zero dimension (w=0 or h=0). It might be hidden or undisplayed.",
        );
      }

      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uResInfo, w, h);
    };

    window.addEventListener("resize", resize);
    resize();

    // Context for animation variables
    let animationState = {
      time: 0,
      opacity: 0,
    };

    let frameCount = 0;

    // Animate the fade-in using Motion
    const introAnimation = animate(0, opacity, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => {
        animationState.opacity = latest;
      },
    });

    console.log("[SmokeEffect] Kickstarting motion loop");

    // Continuous time loop using Motion's frame loop alternative
    const timeAnimation = animate(0, 1000, {
      duration: 1000 / speed,
      ease: "linear",
      repeat: Infinity,
      onUpdate: (latest) => {
        animationState.time = latest;
        frameCount++;

        if (frameCount === 1) {
          console.log("[SmokeEffect] First frame rendered correctly!");
        } else if (frameCount % 300 === 0) {
          console.log(
            `[SmokeEffect] Still running hook frame: ${frameCount} | opacity: ${animationState.opacity} | time: ${animationState.time}`,
          );
        }

        // Render step
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.uniform1f(uTime, animationState.time);
        gl.uniform1f(uOpacity, animationState.opacity);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      },
    });

    return () => {
      window.removeEventListener("resize", resize);
      introAnimation.stop();
      timeAnimation.stop();
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, [color1, color2, speed, density, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none w-full h-full select-none ${className}`}
      aria-hidden
    />
  );
}
