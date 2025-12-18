import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type Sizes from "@utils/sizes";
import type Time from "@utils/time";

export default class Camera {
  private sizes: Sizes;
  private time: Time;
  private scene: THREE.Scene;
  instance: THREE.PerspectiveCamera;
  controls: OrbitControls;

  constructor(
    sizes: Sizes,
    time: Time,
    scene: THREE.Scene,
    canvas: HTMLCanvasElement,
  ) {
    this.sizes = sizes;
    this.time = time;
    this.scene = scene;

    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100,
    );
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);

    this.controls = new OrbitControls(this.instance, canvas);
    this.controls.enableDamping = true;

    this.sizes.on("resize", ({ width, height }) => {
      this.instance.aspect = width / height;
      this.instance.updateProjectionMatrix();
    });

    this.time.on("tick", () => {
      this.controls.update();
    });
  }
}
