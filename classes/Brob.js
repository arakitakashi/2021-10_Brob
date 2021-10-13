import * as THREE from 'three'
import { Pane } from 'tweakpane'

import vertexShader from '../shaders/brob/vertexShader.glsl'
import fragmentShader from '../shaders/brob/fragmentShader.glsl'

export default class Brob {
  constructor(scene) 
  {
    this.scene = scene
    this.clock = new THREE.Clock()

    this.settings = 
    {
      speed: 0.2,
      density: 1.5,
      strength: 0.2,
      frequency: 3.0,
      amplitude: 6.0,
      intensity: 3.0
    }
  }

  init() {
    this.setConfig()
    this.setDebug()

    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }

  setConfig() {
    this.config = {}

    this.config.debug = window.location.hash === '#debug'
  }

  setDebug() {
    if(this.config.debug)
    {
      this.debug = new Pane()
      this.debug.containerElem_.style.width = '320px'

      this.debugFolder1 = this.debug.addFolder({
        title: 'shape'
      })

      this.debugFolder1.addInput(
        this.settings,
        'speed',
        { label: 'speed', min: 0.1, max: 1, step: 0.01}
      )
      this.debugFolder1.addInput(
        this.settings,
        'density',
        { label: 'density', min: 0, max: 10, step: 0.01}
      )
      this.debugFolder1.addInput(
        this.settings,
        'strength',
        { label: 'strength', min: 0, max: 2, step: 0.01}
      )

      this.debugFolder2 = this.debug.addFolder({
        title: 'rotation'
      })

      this.debugFolder2.addInput(
        this.settings,
        'frequency',
        { label: 'frequency', min: 0, max: 10, step: 0.1}
      )

      this.debugFolder2.addInput(
        this.settings,
        'amplitude',
        { label: 'amplitude', min: 0, max: 10, step: 0.1}
      )

      this.debugFolder3 = this.debug.addFolder({
        title: 'color'
      })

      this.debugFolder3.addInput(
        this.settings,
        'intensity',
        { label: 'intensity', min: 0, max: 10, step: 0.1}
      )

    }
  }

  setGeometry() {
    this.geometry = new THREE.IcosahedronBufferGeometry(1, 64)
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial(
      {
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: this.settings.speed },
          uNoiseDensity: { value: this.settings.density },
          uNoiseStrength: { value: this.settings.strength },
          uFrequency: { value: this.settings.frequency },
          uAmplitude: { value: this.settings.amplitude },
          uIntensity: { value: this.settings.intensity }
        },
        wireframe: false
      }
    )
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  update() {
    const elapsedTime = this.clock.getElapsedTime()

    this.mesh.material.uniforms.uTime.value = elapsedTime
    this.mesh.material.uniforms.uSpeed.value = this.settings.speed
    this.mesh.material.uniforms.uNoiseDensity.value = this.settings.density
    this.mesh.material.uniforms.uNoiseStrength.value = this.settings.strength
    this.mesh.material.uniforms.uFrequency.value = this.settings.frequency
    this.mesh.material.uniforms.uAmplitude.value = this.settings.amplitude
    this.mesh.material.uniforms.uIntensity.value = this.settings.intensity
  }
}