import * as THREE from "three";

import Debug from "@utils/debug";
import Sizes from "@utils/sizes";
import Time from "@utils/time";
import Resources from "@utils/resources";
import Camera from "@experience/camera";
import Renderer from "@experience/renderer";
import World from "@experience/world/world";
import sources from "@experience/sources";

export default class Experience {
  private canvas: HTMLCanvasElement;

  debug: Debug;
  sizes: Sizes;
  time: Time;
  scene: THREE.Scene;
  resources: Resources;
  camera: Camera;
  renderer: Renderer;
  world: World;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    // Utils
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.resources = new Resources(sources);

    // Create Scene
    this.scene = new THREE.Scene();

    // Create Camera
    this.camera = new Camera(this.sizes, this.time, this.scene, this.canvas);

    // Create Renderer
    this.renderer = new Renderer(
      this.sizes,
      this.time,
      this.scene,
      this.camera,
      this.canvas,
    );

    // Create World
    this.world = new World(this.scene, this.resources, this.time, this.debug);
  }

  destroy(): void {
    this.sizes.off("resize");
    this.time.off("tick");

    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        for (const key in child.material) {
          const value = (child.material as Record<string, unknown>)[key];
          if (value && typeof value === "object" && "dispose" in value) {
            (value as { dispose: () => void }).dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active && this.debug.ui) {
      this.debug.ui.dispose();
    }
  }
}
