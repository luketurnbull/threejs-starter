import { Pane } from "tweakpane";

export default class Debug {
  active: boolean;
  ui: Pane | null;

  constructor() {
    this.active = window.location.hash === "#debug";
    this.ui = this.active ? new Pane() : null;
  }
}
