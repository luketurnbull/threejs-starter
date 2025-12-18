import * as THREE from "three";
import type Debug from "~/utils/debug";
import type Time from "~/utils/time";
import vertexShader from "./vertex.vert";
import fragmentShader from "./fragment.frag";
import type { FolderApi } from "tweakpane";

export class PlaneShader {
  private mesh: THREE.Mesh;
  private material: THREE.RawShaderMaterial;
  private debugFolder?: FolderApi;

  private uTime: THREE.Uniform<number> = new THREE.Uniform(0);
  private uColor: THREE.Uniform<THREE.Color> = new THREE.Uniform(
    new THREE.Color(0xffffff),
  );

  constructor(scene: THREE.Scene, time: Time, debug: Debug) {
    // Create material
    this.material = this.createMaterial();

    // Create geometry
    const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

    // Create mesh
    this.mesh = new THREE.Mesh(geometry, this.material);

    // Add mesh to scene
    scene.add(this.mesh);

    // Updater
    this.update(time);

    // Add debug
    this.addDebug(debug);
  }

  update(time: Time) {
    time.on("tick", ({ elapsed }) => {
      this.uTime.value = elapsed * 0.001;
    });
  }

  createMaterial() {
    return new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: this.uTime,
        uColor: this.uColor,
      },
    });
  }

  addDebug(debug: Debug) {
    if (debug.active) {
      this.debugFolder = debug.ui?.addFolder({
        title: "Plane Shader",
      });

      this.debugFolder?.addBinding(this.uColor, "value").on("change", () => {
        this.material.uniformsNeedUpdate = true;
      });
    }
  }
}
