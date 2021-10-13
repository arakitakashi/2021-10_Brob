uniform float uTime;
uniform float uSpeed;
uniform float uNoiseDensity;
uniform float uNoiseStrength;
uniform float uFrequency;
uniform float uAmplitude;

varying vec2 vUv; 
varying vec3 vNormal;
varying vec3 vPosition;
varying float vDistort;

#pragma glslify: pnoise = require(glsl-noise/periodic/3d)
#pragma glslify: snoise = require(glsl-noise/simplex/3d)
#pragma glslify: rotateY= require(glsl-rotate/rotateY)

void main() {
    float t = uTime * uSpeed;
    // float distortion = pnoise((normal + t) * uNoiseDensity, vec3(10.0)) * uNoiseStrength;

    float distortion = pnoise((normal + t) * uNoiseDensity, vec3(10.0)) * uNoiseStrength;
    vec3 pos = position + (normal * distortion);

    float angle = sin(uv.y * uFrequency + t) * uAmplitude;
    pos = rotateY(pos, angle);

    vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * modelViewPosition; 

    vUv = uv; 
    vNormal = normal;
    vPosition = position;
    vDistort = distortion;
}