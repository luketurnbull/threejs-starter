import EventEmitter from "./events";

type SizesEvents = {
  resize: {
    width: number;
    height: number;
    pixelRatio: number;
  };
};

export default class Sizes extends EventEmitter<SizesEvents> {
  public width: number;
  public height: number;
  public pixelRatio: number;

  constructor() {
    super();

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = this.getPixelRatio();

    window.addEventListener("resize", () => {
      this.emit("resize", {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: this.getPixelRatio(),
      });
    });
  }

  private getPixelRatio() {
    return Math.min(window.devicePixelRatio, 2);
  }
}
