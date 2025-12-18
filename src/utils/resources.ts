import * as THREE from "three";
import {
  type GLTF,
  GLTFLoader,
} from "three/examples/jsm/loaders/GLTFLoader.js";
import EventEmitter from "@utils/events";
import type { Source } from "@experience/sources";

type ResourcesEvents = {
  ready: {
    itemsLoaded: number;
  };
};

type ResourceItem = THREE.Texture | THREE.CubeTexture | GLTF;

export default class Resources extends EventEmitter<ResourcesEvents> {
  sources: Source[];
  items: Record<string, ResourceItem>;
  toLoad: number;
  loaded: number;
  loaders: {
    gltfLoader: GLTFLoader;
    textureLoader: THREE.TextureLoader;
    cubeTextureLoader: THREE.CubeTextureLoader;
  };

  constructor(sources: Source[]) {
    super();

    this.sources = sources;
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new THREE.TextureLoader(),
      cubeTextureLoader: new THREE.CubeTextureLoader(),
    };

    this.startLoading();
  }

  private startLoading(): void {
    for (const source of this.sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path as string, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path as string, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path as string[], (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  private sourceLoaded(source: Source, file: ResourceItem): void {
    this.items[source.name] = file;
    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.emit("ready", {
        itemsLoaded: this.loaded,
      });
    }
  }
}
