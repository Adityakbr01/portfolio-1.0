"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── GLSL Shaders ────────────────────────────────────────────────────────────

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform vec2  uResolution;

  // ── Noise helpers ──────────────────────────────────────────────────────────
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314*r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  // ── FBM (fractal brownian motion) ──────────────────────────────────────────
  float fbm(vec3 p) {
    float val  = 0.0;
    float amp  = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 5; i++) {
      val  += amp * snoise(p * freq);
      amp  *= 0.5;
      freq *= 2.1;
    }
    return val;
  }

  void main() {
    // aspect-correct UV in [-1, 1]
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 uv = (vUv - 0.5) * aspect * 2.0;

    float t = uTime * 0.18;

    // ── Domain-warped noise layers ─────────────────────────────────────────
    vec3 q = vec3(uv, t);
    float n1 = fbm(q + vec3(0.0,  0.0,  t * 0.6));
    float n2 = fbm(q + vec3(n1 * 1.4, n1 * 0.9, t * 0.4));
    float n3 = fbm(q + vec3(n2 * 0.8, n2 * 1.2, t * 0.3));

    float field = fbm(vec3(uv + vec2(n2, n3) * 1.2, t));

    // ── Colour palette ────────────────────────────────────────────────────
    // background: very dark (#171717 ≈ 0.09, 0.09, 0.09)
    vec3 bgColor     = vec3(0.09, 0.09, 0.09);
    // amber core
    vec3 amberDeep   = vec3(0.55, 0.30, 0.02);   // deep burnt amber
    vec3 amberMid    = vec3(0.85, 0.58, 0.10);   // warm amber
    vec3 amberLight  = vec3(0.98, 0.88, 0.55);   // soft gold
    // warm accent
    vec3 orangeGlow  = vec3(0.72, 0.32, 0.04);

    // remap field to [0,1]
    float f = field * 0.5 + 0.5;
    f = smoothstep(0.0, 1.0, f);

    // layer colours
    vec3 col = bgColor;
    col = mix(col,    amberDeep,  smoothstep(0.20, 0.50, f) * 0.75);
    col = mix(col,    orangeGlow, smoothstep(0.35, 0.60, f) * 0.55);
    col = mix(col,    amberMid,   smoothstep(0.45, 0.72, f) * 0.65);
    col = mix(col,    amberLight, smoothstep(0.60, 0.85, f) * 0.40);

    // ── Radial vignette — darker toward edges ─────────────────────────────
    float vignette = 1.0 - length(vUv - 0.5) * 1.6;
    vignette = clamp(vignette, 0.0, 1.0);
    vignette = pow(vignette, 1.4);
    col *= vignette;

    // ── Subtle scanline grain ─────────────────────────────────────────────
    float grain = snoise(vec3(uv * 10.0, t * 12.0)) * 0.025;
    col += grain;

    // ── Overall brightness cap ────────────────────────────────────────────
    col = clamp(col * 0.85, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
  }
`;

// ─── Inner mesh that drives the shader ───────────────────────────────────────
function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh ref={meshRef}>
      {/* Full-screen triangle — slightly bigger than clip space */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────
export default function ShaderBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 1], near: 0.1, far: 10 }}
        gl={{ antialias: false, alpha: false }}
        dpr={[0.1, 1]} // cap pixel-ratio for perf
        style={{ width: "100%", height: "100%" }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
