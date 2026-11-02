import * as THREE from "three";

/**
 * Velora hero scene: a procedural dusk-mountain landscape (fragment shader rendered into a
 * render target used as the scene background) with the Velora "V" rebuilt as refractive glass.
 * The glass samples the background through three's transmission pass, so the mountains bend
 * through the logo as it turns.
 */

const BG_VERT = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const BG_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;
uniform float uPx;
uniform float uPan;

float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1.0, 0.0)), u.x), mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0; float a = 0.5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}
float ridged(float x, float s) {
  float v = 0.0; float a = 0.55; float f = 1.0;
  for (int i = 0; i < 6; i++) {
    float n = noise(vec2(x * f, s + float(i) * 7.13));
    n = 1.0 - abs(n * 2.0 - 1.0);
    v += a * n * n; f *= 2.07; a *= 0.47;
  }
  return v;
}

float ridged2(vec2 p) {
  float v = 0.0; float a = 0.5; mat2 m = mat2(1.7, 1.1, -1.1, 1.7);
  for (int i = 0; i < 5; i++) { float n = 1.0 - abs(noise(p) * 2.0 - 1.0); v += a * n * n; p = m * p + 3.1; a *= 0.5; }
  return v;
}

// --- mountain silhouettes (x in aspect-space, returns height in 0..1 screen space)
float hFar(float x) {
  float env = 0.16 + 1.0 * exp(-pow((x + 0.72) / 0.42, 2.0)) + 0.5 * exp(-pow((x - 0.9) / 0.34, 2.0));
  return 0.405 + 0.36 * env * ridged(x * 1.35 + 3.0, 1.0);
}
float hMid(float x) {
  float sides = smoothstep(0.05, 1.0, abs(x - 0.05));
  return 0.318 + 0.15 * ridged(x * 2.3 + 11.0, 4.0) * (0.35 + 0.65 * sides) + 0.03 * sides;
}
float hNear(float x) {
  float sides = smoothstep(0.18, 1.05, abs(x - 0.06));
  float h = 0.205 + 0.17 * sides + 0.06 * ridged(x * 3.4 + 21.0, 9.0) * (0.4 + sides);
  float cell = floor(x * 78.0);
  float tree = (1.0 - 2.0 * abs(fract(x * 78.0) - 0.5)) * step(0.25, hash12(vec2(cell, 3.0)));
  return h + tree * (0.012 + 0.012 * hash12(vec2(cell, 7.0))) * (0.3 + sides);
}

vec3 sky(vec2 p) {
  float y = p.y;
  vec3 c = mix(vec3(1.0, 0.80, 0.70), vec3(0.97, 0.68, 0.78), smoothstep(0.30, 0.47, y));
  c = mix(c, vec3(0.70, 0.52, 0.83), smoothstep(0.44, 0.64, y));
  c = mix(c, vec3(0.36, 0.27, 0.62), smoothstep(0.60, 0.84, y));
  c = mix(c, vec3(0.13, 0.10, 0.30), smoothstep(0.82, 1.08, y));

  // warm sun glow sinking behind the right ridges
  float d = length((p - vec2(0.34, 0.43)) * vec2(0.55, 1.0));
  c += vec3(1.0, 0.70, 0.52) * (0.32 + 0.04 * sin(uTime * 0.4)) * exp(-d * 4.2);

  // drifting cirrus, lit pink from below
  float n = fbm(vec2(p.x * 1.5 + uTime * 0.010, y * 6.5 - uTime * 0.002));
  float n2 = fbm(vec2(p.x * 3.2 - uTime * 0.006 + 4.0, y * 12.0));
  float cloud = smoothstep(0.52, 0.82, n * 0.75 + n2 * 0.35) * smoothstep(0.46, 0.60, y) * (1.0 - smoothstep(0.86, 1.0, y));
  vec3 cloudCol = mix(vec3(1.0, 0.72, 0.80), vec3(0.58, 0.44, 0.80), smoothstep(0.5, 0.92, y));
  c = mix(c, cloudCol, cloud * 0.6);

  // stars, twinkling, fading in toward the top
  vec2 sp = p * 95.0;
  vec2 cell = floor(sp);
  float h = hash12(cell);
  float star = step(0.982, h) * smoothstep(0.17, 0.0, length(fract(sp) - 0.5 - (vec2(hash12(cell + 3.1), hash12(cell + 8.7)) - 0.5) * 0.5));
  star *= 0.55 + 0.45 * sin(uTime * (1.5 + h * 3.0) + h * 80.0);
  c += vec3(1.0, 0.95, 1.0) * star * smoothstep(0.66, 0.93, y) * (1.0 - cloud);
  return c;
}

vec3 landscape(vec2 p) {
  vec2 m = uMouse;
  vec3 col = sky(p + vec2(m.x * 0.006, 0.0));

  // far snowy range
  float xf = p.x + m.x * 0.014;
  float yf = p.y + uScroll * 0.05;
  float hf = hFar(xf);
  float aa = uPx * 1.5;
  float inFar = smoothstep(hf + aa, hf - aa, yf);
  if (inFar > 0.0) {
    float depth = hf - yf;
    // shade the face from a 2D ridged height field: reads as real couloirs and spurs
    vec2 q = vec2(xf * 4.0, yf * 3.1);
    float e = 0.012;
    float H = ridged2(q);
    float hx = ridged2(q + vec2(e, 0.0)) - ridged2(q - vec2(e, 0.0));
    float hy = ridged2(q + vec2(0.0, e)) - ridged2(q - vec2(0.0, e));
    vec3 n = normalize(vec3(-hx / (2.0 * e), -hy / (2.0 * e) * 0.6, 0.9));
    float sx = xf + depth * 0.35;
    float slope = (hFar(sx + 0.004) - hFar(sx - 0.004)) / 0.008;
    float faceLight = clamp(0.5 - slope * 0.8, 0.0, 1.0);
    float light = clamp(dot(n, normalize(vec3(0.75, 0.35, 0.55))) * 0.9 + 0.15, 0.0, 1.0);
    light = mix(light, faceLight, 0.42);
    float snowLine = 0.09 + 0.08 * fbm(vec2(xf * 4.0, yf * 2.0));
    float snow = (1.0 - smoothstep(snowLine * 0.5, snowLine * 1.4, depth)) * smoothstep(0.42, 0.62, H + 0.18 - depth * 1.2);
    vec3 rock = mix(vec3(0.24, 0.20, 0.44), vec3(0.60, 0.46, 0.70), light);
    vec3 sn = mix(vec3(0.60, 0.58, 0.88), vec3(1.0, 0.89, 0.90), light);
    vec3 mc = mix(rock, sn, snow);
    mc += vec3(1.0, 0.75, 0.80) * exp(-depth * 220.0) * light * 0.25;
    mc = mix(mc, vec3(0.80, 0.63, 0.83), smoothstep(0.03, 0.3, depth) * 0.6 + 0.06);
    col = mix(col, mc, inFar);
  }

  // valley mist above the mid range
  float mist = fbm(vec2(p.x * 2.2 - uTime * 0.018, p.y * 9.0 + uTime * 0.01));
  col = mix(col, vec3(0.93, 0.74, 0.85), smoothstep(0.25, 0.85, mist) * exp(-pow((p.y - 0.38) / 0.045, 2.0)) * 0.55);

  // mid range
  float xm = p.x + m.x * 0.026;
  float ym = p.y + uScroll * 0.09;
  float hm = hMid(xm);
  float inMid = smoothstep(hm + aa, hm - aa, ym);
  if (inMid > 0.0) {
    float depth = hm - ym;
    vec2 q = vec2(xm * 5.0 + 40.0, ym * 6.0);
    float e = 0.015;
    float hx = ridged2(q + vec2(e, 0.0)) - ridged2(q - vec2(e, 0.0));
    float hy = ridged2(q + vec2(0.0, e)) - ridged2(q - vec2(0.0, e));
    vec3 n = normalize(vec3(-hx / (2.0 * e), -hy / (2.0 * e) * 0.6, 1.0));
    float light = clamp(dot(n, normalize(vec3(0.75, 0.35, 0.55))) * 0.9 + 0.1, 0.0, 1.0);
    vec3 mc = mix(vec3(0.17, 0.13, 0.32), vec3(0.46, 0.35, 0.62), light);
    mc += vec3(1.0, 0.70, 0.78) * exp(-depth * 160.0) * (0.15 + light * 0.3);
    mc = mix(mc, vec3(0.55, 0.42, 0.70), smoothstep(0.0, 0.12, depth) * 0.5);
    col = mix(col, mc, inMid);
  }

  // valley floor with town lights
  float xv = p.x + m.x * 0.034;
  float yv = p.y + uScroll * 0.12;
  float hv = 0.295 + 0.008 * noise(vec2(xv * 6.0, 2.0));
  float inV = smoothstep(hv + aa, hv - aa, yv);
  if (inV > 0.0) {
    vec3 vc = mix(vec3(0.16, 0.12, 0.27), vec3(0.30, 0.22, 0.42), smoothstep(hv - 0.08, hv, yv));
    float density = exp(-pow(xv / 0.75, 2.0)) * smoothstep(hv - 0.11, hv - 0.03, yv) * (1.0 - smoothstep(hv - 0.01, hv, yv));
    vec2 lp = vec2(xv, yv) * vec2(170.0, 260.0);
    vec2 lc = floor(lp);
    float lh = hash12(lc);
    float on = step(1.0 - density * 0.32, lh);
    vec2 jit = vec2(hash12(lc + 1.7), hash12(lc + 9.2)) - 0.5;
    float glow = smoothstep(0.3, 0.0, length(fract(lp) - 0.5 - jit * 0.5)) * (0.5 + 0.5 * hash12(lc + 4.4));
    float tw = 0.65 + 0.35 * sin(uTime * (2.0 + lh * 4.0) + lh * 60.0);
    vec3 lcol = mix(vec3(1.0, 0.78, 0.45), vec3(1.0, 0.9, 0.82), hash12(lc + 5.0));
    vc += lcol * on * glow * tw * 1.25;
    vc += vec3(1.0, 0.62, 0.50) * density * 0.16;
    col = mix(col, vc, inV);
  }

  // forested near hills framing the valley
  float xn = p.x + m.x * 0.05;
  float yn = p.y + uScroll * 0.18;
  float hn = hNear(xn);
  float inN = smoothstep(hn + aa, hn - aa, yn);
  if (inN > 0.0) {
    float depth = hn - yn;
    vec3 nc = mix(vec3(0.07, 0.055, 0.14), vec3(0.17, 0.12, 0.27), exp(-depth * 18.0));
    nc += vec3(0.95, 0.6, 0.7) * exp(-depth * 260.0) * 0.18;
    col = mix(col, nc, inN);
  }
  return col;
}

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2((vUv.x - 0.5) * aspect + uPan, vUv.y);
  float water = 0.13 - uScroll * 0.1;
  vec3 col;
  if (p.y < water) {
    float d = water - p.y;
    float ripple = sin(p.y * 260.0 / (0.25 + d * 4.0) + uTime * 1.4) * 0.0035 * (0.3 + d * 7.0);
    vec2 rp = vec2(p.x + ripple + noise(vec2(p.x * 9.0, p.y * 60.0 - uTime * 0.6)) * 0.004, water + d * 1.15);
    col = landscape(rp) * vec3(0.66, 0.6, 0.82);
    float shimmer = pow(noise(vec2(p.x * 36.0 + uTime * 0.15, p.y * 420.0 - uTime * 0.9)), 7.0);
    col += vec3(1.0, 0.82, 0.9) * shimmer * 0.55 * smoothstep(0.12, 0.0, d);
    col = mix(col, vec3(0.10, 0.08, 0.2), smoothstep(0.0, 0.2, d) * 0.6);
    col += vec3(1.0, 0.85, 0.9) * exp(-d * 200.0) * 0.12;
  } else {
    col = landscape(p);
  }
  // vignette + film grain to keep gradients from banding
  vec2 q = vUv - 0.5;
  col *= 1.0 - dot(q, q) * 0.45;
  col += (hash12(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5) / 255.0 * 2.0;
  gl_FragColor = vec4(pow(max(col, 0.0), vec3(2.2)), 1.0);
}
`;

const PARTICLE_VERT = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform vec3 uBox;
attribute float aSeed;
varying float vAlpha;
varying float vHue;
void main() {
  vec3 p = position;
  p.y = mod(p.y + uTime * (0.06 + aSeed * 0.1) + uBox.y * 0.5, uBox.y) - uBox.y * 0.5;
  p.x += sin(uTime * 0.4 + aSeed * 30.0) * 0.18;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (0.4 + aSeed) * (8.0 / -mv.z);
  float edge = 1.0 - smoothstep(0.32, 0.5, abs(p.y / uBox.y));
  vAlpha = edge * (0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * 1.7 + aSeed * 50.0)));
  vHue = aSeed;
}
`;

const PARTICLE_FRAG = /* glsl */ `
varying float vAlpha;
varying float vHue;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  vec3 c = mix(vec3(1.0, 0.78, 0.92), vec3(0.78, 0.74, 1.0), vHue);
  gl_FragColor = vec4(c, a * a * vAlpha * 0.9);
}
`;

const GLOW_FRAG = /* glsl */ `
varying vec2 vUv;
uniform float uTime;
void main() {
  float d = length((vUv - 0.5) * vec2(1.0, 2.6));
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(vec3(0.72, 0.55, 1.0), a * a * (0.42 + 0.08 * sin(uTime * 1.3)));
}
`;

const GLOW_VERT = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

type V2 = [number, number];

function insetPolygon(pts: V2[], d: number): V2[] {
  // Offset each edge inward (polygon is CCW) and intersect neighbouring offset lines.
  const n = pts.length;
  const lines = pts.map((a, i) => {
    const b = pts[(i + 1) % n];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy);
    const nx = -dy / len;
    const ny = dx / len;
    return { p: [a[0] + nx * d, a[1] + ny * d] as V2, dir: [dx, dy] as V2 };
  });
  return lines.map((l, i) => {
    const prev = lines[(i + n - 1) % n];
    const den = prev.dir[0] * l.dir[1] - prev.dir[1] * l.dir[0];
    const t = ((l.p[0] - prev.p[0]) * l.dir[1] - (l.p[1] - prev.p[1]) * l.dir[0]) / den;
    return [prev.p[0] + prev.dir[0] * t, prev.p[1] + prev.dir[1] * t] as V2;
  });
}

/** Right facet of the Velora mark as a faceted crystal slab (flat-shaded triangles). */
function crystalGeometry(depth: number) {
  const A: V2 = [0.413, 1.0];
  const B: V2 = [1.217, 1.05];
  const C: V2 = [0.163, -1.0];
  const D: V2 = [-0.109, -1.0];
  const I1: V2 = [0.75, 0.62];
  const I2: V2 = [0.42, 0.05];
  const I3: V2 = [0.12, -0.6];
  const half = depth / 2;
  const bulge = new Map<V2, number>([
    [I1, 0.1],
    [I2, 0.17],
    [I3, 0.08],
  ]);
  const faces: Array<[V2, V2, V2]> = [
    [A, B, I1], [B, I2, I1], [B, C, I2], [C, I3, I2],
    [C, D, I3], [D, I2, I3], [D, A, I2], [A, I1, I2],
  ];
  const tri: number[] = [];
  const push = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, outward: THREE.Vector3) => {
    const n = new THREE.Vector3().subVectors(b, a).cross(new THREE.Vector3().subVectors(c, a));
    if (n.dot(outward) < 0) [b, c] = [c, b];
    tri.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
  };
  const v = (p: V2, side: 1 | -1) => new THREE.Vector3(p[0], p[1], side * (half + (bulge.get(p) ?? 0) * (side > 0 ? 1 : 0.6)));
  for (const [a, b, c] of faces) {
    push(v(a, 1), v(b, 1), v(c, 1), new THREE.Vector3(0, 0, 1));
    push(v(a, -1), v(b, -1), v(c, -1), new THREE.Vector3(0, 0, -1));
  }
  const ring = [A, B, C, D];
  const center = new THREE.Vector3(0.42, 0.02, 0);
  ring.forEach((p, i) => {
    const q = ring[(i + 1) % ring.length];
    const f1 = v(p, 1), f2 = v(q, 1), b1 = v(p, -1), b2 = v(q, -1);
    const out = new THREE.Vector3((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, 0).sub(center);
    push(f1, f2, b2, out);
    push(f1, b2, b1, out);
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(tri, 3));
  g.computeVertexNormals();
  return g;
}

/** Left facet of the mark: the hollow outlined stroke, extruded with a soft bevel. */
function frameGeometry() {
  const outer: V2[] = [[-1.196, 1.0], [-0.38, -0.49], [0.0, -0.49], [-0.783, 1.0]];
  // ensure CCW for the inset routine
  const area = outer.reduce((s, p, i) => s + (p[0] * outer[(i + 1) % 4][1] - outer[(i + 1) % 4][0] * p[1]), 0);
  const ccw = area > 0 ? outer : [...outer].reverse();
  const inner = insetPolygon(ccw, 0.11);
  const shape = new THREE.Shape(ccw.map(([x, y]) => new THREE.Vector2(x, y)));
  shape.holes.push(new THREE.Path([...inner].reverse().map(([x, y]) => new THREE.Vector2(x, y))));
  const g = new THREE.ExtrudeGeometry(shape, {
    depth: 0.16,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.022,
    bevelSegments: 3,
  });
  g.translate(0, 0, -0.08);
  return g;
}

function skyEnvironment(renderer: THREE.WebGLRenderer) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, "#1c1640");
  g.addColorStop(0.3, "#5a43a0");
  g.addColorStop(0.46, "#f2a8c4");
  g.addColorStop(0.5, "#ffe0cc");
  g.addColorStop(0.56, "#7a5a9e");
  g.addColorStop(1, "#120e24");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 256);
  const spot = (x: number, y: number, r: number, color: string) => {
    const s = ctx.createRadialGradient(x, y, 0, x, y, r);
    s.addColorStop(0, color);
    s.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = s;
    ctx.fillRect(0, 0, 512, 256);
  };
  spot(150, 118, 70, "rgba(255,226,200,0.95)");
  spot(380, 70, 46, "rgba(255,255,255,0.9)");
  spot(300, 150, 60, "rgba(160,140,255,0.6)");
  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromEquirectangular(tex).texture;
  tex.dispose();
  pmrem.dispose();
  return env;
}

export type HeroSceneOptions = { reducedMotion: boolean; onReady?: () => void };

export function mountHeroScene(canvas: HTMLCanvasElement, opts: HeroSceneOptions) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, 8);

  // --- background landscape rendered into a half-float target
  const bgTarget = new THREE.WebGLRenderTarget(2, 2, { type: THREE.HalfFloatType, depthBuffer: false });
  const bgUniforms = {
    uRes: { value: new THREE.Vector2(1, 1) },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2() },
    uScroll: { value: 0 },
    uPx: { value: 0.001 },
    uPan: { value: 0 },
  };
  const bgScene = new THREE.Scene();
  const bgCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  bgScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({ vertexShader: BG_VERT, fragmentShader: BG_FRAG, uniforms: bgUniforms, depthTest: false, depthWrite: false })));
  scene.background = bgTarget.texture;
  scene.environment = skyEnvironment(renderer);

  // --- glass Velora mark
  const mark = new THREE.Group();
  const crystal = new THREE.Mesh(
    crystalGeometry(0.36),
    new THREE.MeshPhysicalMaterial({
      color: "#f1ecff",
      transmission: 1,
      thickness: 1.1,
      roughness: 0.03,
      ior: 1.52,
      dispersion: 0.5,
      iridescence: 0.85,
      iridescenceIOR: 1.3,
      iridescenceThicknessRange: [180, 620],
      attenuationColor: new THREE.Color("#a993ff"),
      attenuationDistance: 2.6,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.25,
      specularIntensity: 1,
      side: THREE.DoubleSide,
    }),
  );
  const frame = new THREE.Mesh(
    frameGeometry(),
    new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      transmission: 1,
      thickness: 0.6,
      roughness: 0.22,
      ior: 1.45,
      iridescence: 0.3,
      clearcoat: 1,
      envMapIntensity: 1.4,
    }),
  );
  frame.position.z = -0.24;
  mark.add(frame, crystal);
  const pivot = new THREE.Group();
  mark.position.x = -0.02;
  pivot.add(mark);
  scene.add(pivot);

  const glow = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.ShaderMaterial({ vertexShader: GLOW_VERT, fragmentShader: GLOW_FRAG, uniforms: { uTime: bgUniforms.uTime }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
  );
  scene.add(glow);

  const light = new THREE.PointLight("#ffd1e6", 18, 20);
  light.position.set(-3, 3, 4);
  const light2 = new THREE.PointLight("#9fb4ff", 14, 20);
  light2.position.set(4, -1, 3);
  scene.add(light, light2);

  // --- floating light motes
  const COUNT = 260;
  const pos = new Float32Array(COUNT * 3);
  const seed = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 12;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 0.5;
    seed[i] = Math.random();
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  pGeo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
  const pUniforms = { uTime: bgUniforms.uTime, uSize: { value: 9 }, uBox: { value: new THREE.Vector3(12, 6, 5) } };
  const particles = new THREE.Points(pGeo, new THREE.ShaderMaterial({ vertexShader: PARTICLE_VERT, fragmentShader: PARTICLE_FRAG, uniforms: pUniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  scene.add(particles);

  // --- layout
  let width = 1;
  let height = 1;
  let compact = false;
  const layout = () => {
    width = canvas.clientWidth || 1;
    height = canvas.clientHeight || 1;
    const dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1.5 : 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const scale = Math.min(1, 1280 / width) * (width < 768 ? 0.9 : 0.75);
    bgTarget.setSize(Math.round(width * scale * dpr), Math.round(height * scale * dpr));
    bgUniforms.uRes.value.set(width, height);
    bgUniforms.uPx.value = 1 / (height * scale * dpr);

    const visH = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const visW = visH * camera.aspect;
    compact = camera.aspect < 1.05;
    const s = compact ? Math.min(visW * 0.26, visH * 0.14) : visH * 0.215;
    // narrow screens only see a slice of the panorama: frame the snowy massif instead of the valley
    bgUniforms.uPan.value = compact ? Math.max(-0.62, -0.62 * (1.05 - camera.aspect) / 0.55) : 0;
    pivot.scale.setScalar(s);
    pivot.position.set(compact ? visW * 0.04 : visW * 0.29, compact ? -visH * 0.19 : -visH * 0.1, 0);
    glow.scale.set(s * 3.6, s * 1.6, 1);
    glow.position.set(pivot.position.x, pivot.position.y - s * 1.05, -0.6);
    pUniforms.uBox.value.set(visW * 1.1, visH * 1.1, 5);
    particles.scale.setScalar(1);
  };
  layout();
  const ro = new ResizeObserver(layout);
  ro.observe(canvas);

  // --- input
  const mouse = new THREE.Vector2();
  const target = new THREE.Vector2();
  const onPointer = (e: PointerEvent) => {
    target.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
  };
  window.addEventListener("pointermove", onPointer, { passive: true });
  const scrollProgress = () => Math.min(1, Math.max(0, window.scrollY / Math.max(1, height)));

  // --- loop (paused while the hero is offscreen)
  let visible = true;
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !opts.reducedMotion) start();
  });
  io.observe(canvas);

  const clock = new THREE.Clock();
  let raf = 0;
  let ready = false;
  const frameOnce = (t: number) => {
    mouse.lerp(target, 0.045);
    const sp = scrollProgress();
    bgUniforms.uTime.value = t;
    bgUniforms.uMouse.value.copy(mouse);
    bgUniforms.uScroll.value = sp;

    pivot.rotation.y = -0.22 + Math.sin(t * 0.32) * 0.26 + mouse.x * 0.3 + sp * 1.2;
    pivot.rotation.x = 0.06 + Math.sin(t * 0.27) * 0.05 - mouse.y * 0.18;
    pivot.rotation.z = Math.sin(t * 0.21) * 0.04;
    mark.position.y = Math.sin(t * 0.8) * 0.06 + sp * 0.8;
    particles.rotation.y = mouse.x * 0.08;
    camera.position.x = mouse.x * 0.18;
    camera.position.y = mouse.y * 0.1;
    camera.lookAt(0, 0, 0);

    renderer.setRenderTarget(bgTarget);
    renderer.render(bgScene, bgCam);
    renderer.setRenderTarget(null);
    renderer.render(scene, camera);
    if (!ready) {
      ready = true;
      opts.onReady?.();
    }
  };
  const tick = () => {
    raf = 0;
    if (!visible) return;
    frameOnce(clock.getElapsedTime());
    raf = requestAnimationFrame(tick);
  };
  function start() {
    if (!raf) raf = requestAnimationFrame(tick);
  }

  if (opts.reducedMotion) {
    frameOnce(12);
    ro.disconnect();
    const redraw = () => {
      layout();
      frameOnce(12);
    };
    const ro2 = new ResizeObserver(redraw);
    ro2.observe(canvas);
    return () => {
      ro2.disconnect();
      dispose();
    };
  }
  start();

  function dispose() {
    cancelAnimationFrame(raf);
    io.disconnect();
    window.removeEventListener("pointermove", onPointer);
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      const mat = m.material as THREE.Material | undefined;
      mat?.dispose();
    });
    bgScene.traverse((o) => {
      (o as THREE.Mesh).geometry?.dispose();
      ((o as THREE.Mesh).material as THREE.Material | undefined)?.dispose();
    });
    scene.environment?.dispose();
    bgTarget.dispose();
    renderer.dispose();
  }

  return () => {
    ro.disconnect();
    dispose();
  };
}
