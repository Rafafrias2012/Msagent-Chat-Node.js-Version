export class MSWindow {
  wnd;
  config;
  titlebar;
  body;
  shown;
  dragging;
  x;
  y;

  constructor(wnd, config) {
    this.shown = false;
    this.wnd = wnd;
    this.config = config;
    this.wnd.style.width = config.width + "px";
    this.wnd.style.height = config.height + "px";
    let titlebar = this.wnd.querySelector("div.ms-window-titlebar");
    let body = this.wnd.querySelector("div.ms-window-body");
    if (!titlebar || !body)
      throw new Error("MSWindow is missing titlebar or body element.");
    this.titlebar = titlebar;
    this.body = body;
    // Register window move handlers
    this.dragging = false;
    switch (this.config.startPosition) {
      case 0: { // TopLeft
        this.x = 0;
        this.y = 0;
        break;
      }
      case 1: { // Center
        this.x = (document.documentElement.clientWidth / 2) - (this.config.width / 2);
        this.y = (document.documentElement.clientHeight / 2) - (this.config.height / 2);
        break;
      }
      default: {
        throw new Error("Invalid start position");
      }
    }
    this.setLoc();
    this.titlebar.addEventListener('mousedown', () => {
      this.dragging = true;
      document.addEventListener('mouseup', () => {
        this.dragging = false;
      }, {once: true});
    });
    document.addEventListener('mousemove', e => {
      if (!this.dragging) return;
      this.x += e.movementX;
      this.y += e.movementY;
      this.setLoc();
    });
    window.addEventListener('resize', () => {
      this.setLoc();
    });
  }

  show() {
    this.wnd.style.display = "block";
    this.shown = true;
  }

  hide() {
    this.wnd.style.display = "none";
    this.shown = false;
  }

  setLoc() {
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
    if (this.x > document.documentElement.clientWidth - this.config.width) this.x = document.documentElement.clientWidth - this.config.width;
    if (this.y > document.documentElement.clientHeight - this.config.height) this.y = document.documentElement.clientHeight - this.config.height;
    this.wnd.style.top = this.y + "px";
    this.wnd.style.left = this.x + "px";
  }
}
