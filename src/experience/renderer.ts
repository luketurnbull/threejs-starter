import * as THREE from "three";
import type Sizes from "@utils/sizes";
import type Camera from "@experience/camera";
import type Time from "@utils/time";

export default class Renderer {
  private sizes: Sizes;
  private time: Time;
  private scene: THREE.Scene;
  private camera: Camera;
  instance: THREE.WebGLRenderer;

  constructor(
    sizes: Sizes,
    time: Time,
    scene: THREE.Scene,
    camera: Camera,
    canvas: HTMLCanvasElement,
  ) {
    this.sizes = sizes;
    this.time = time;
    this.scene = scene;
    this.camera = camera;

    this.instance = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor("#211d20");
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);

    this.sizes.on("resize", ({ width, height, pixelRatio }) => {
      this.instance.setSize(width, height);
      this.instance.setPixelRatio(pixelRatio);
    });

    this.time.on("tick", () => {
      this.instance.render(this.scene, this.camera.instance);
    });
  }
}
