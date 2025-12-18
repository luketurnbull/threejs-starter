import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import EventEmitter from "~/utils/events";
import type {
  Loader,
  ResourceItem,
  Source,
  SourceType,
} from "~/types/resources";

type ResourcesEvents = {
  ready: {
    itemsLoaded: number;
  };
};

export default class Resources extends EventEmitter<ResourcesEvents> {
  items: Record<string, ResourceItem>;
  toLoad: number;
  loaded: number;
  loaders: Map<SourceType, Loader>;

  constructor(sources: Source[]) {
    super();

    this.items = {};
    this.toLoad = sources.length;
    this.loaded = 0;

    // Create loaders for each source type
    this.loaders = new Map<SourceType, Loader>([
      ["gltfModel", new GLTFLoader()],
      ["texture", new THREE.TextureLoader()],
      ["cubeTexture", new THREE.CubeTextureLoader()],
    ]);

    this.startLoading(sources);
  }

  private startLoading(sources: Source[]): void {
    for (const source of sources) {
      const loader = this.loaders.get(source.type);

      if (!loader) {
        console.error(`No loader found for type ${source.type}`);
        continue;
      }

      loader.load(source.path as string & readonly string[], (file) => {
        this.sourceLoaded(source, file);
      });
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
