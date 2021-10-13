uniform float uIntensity;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying float vDistort;

vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}   

void main() {
    float distort = vDistort * uIntensity;

    vec3 brightness = vec3(0.5, 0.5, 0.82);
    vec3 contrast = vec3(0.5, 0.5, 0.85);
    vec3 oscilation = vec3(1.0, 0.7, 0.4);
    vec3 phase = vec3(0.0, 0.15, 0.2);

    vec3 color = cosPalette(distort, brightness, contrast, oscilation, phase);

    gl_FragColor = vec4(color, 1.);
}