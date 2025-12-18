import * as THREE from "three";
import type Resources from "~/utils/resources";

export default class Floor {
  mesh: THREE.Mesh;

  constructor(scene: THREE.Scene, resources: Resources) {
    const geometry = new THREE.CircleGeometry(5, 64);
    const material = this.createMaterial(resources);

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;

    scene.add(this.mesh);
  }

  createMaterial(resources: Resources) {
    const colorTexture = resources.items.grassColorTexture as THREE.Texture;
    colorTexture.colorSpace = THREE.SRGBColorSpace;
    colorTexture.repeat.set(1.5, 1.5);
    colorTexture.wrapS = THREE.RepeatWrapping;
    colorTexture.wrapT = THREE.RepeatWrapping;

    const normalTexture = resources.items.grassNormalTexture as THREE.Texture;
    normalTexture.repeat.set(1.5, 1.5);
    normalTexture.wrapS = THREE.RepeatWrapping;
    normalTexture.wrapT = THREE.RepeatWrapping;

    return new THREE.MeshStandardMaterial({
      map: colorTexture,
      normalMap: normalTexture,
    });
  }
}
