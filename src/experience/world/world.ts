import * as THREE from "three";
import type Resources from "@utils/resources";
import type Time from "@utils/time";
import type Debug from "@utils/debug";
import Environment from "@experience/world/environment";
import Floor from "@experience/world/floor";
import Fox from "@experience/world/fox";
import { PlaneShader } from "@experience/world/plane";

export default class World {
  floor!: Floor;
  fox!: Fox;
  environment!: Environment;
  plane!: PlaneShader;

  constructor(
    scene: THREE.Scene,
    resources: Resources,
    time: Time,
    debug: Debug,
  ) {
    resources.on("ready", () => {
      this.floor = new Floor(scene, resources);
      this.fox = new Fox(scene, resources, time, debug);
      this.plane = new PlaneShader(scene, time, debug);
      this.environment = new Environment(scene, resources, debug);
    });
  }
}
