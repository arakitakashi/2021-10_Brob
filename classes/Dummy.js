import * as THREE from "three"

export default class Dummy {
  constructor(scene) {
    this.scene = scene
  }

  init() {
      this.cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial()
      )
    this.scene.add(this.cube)
  }
} 