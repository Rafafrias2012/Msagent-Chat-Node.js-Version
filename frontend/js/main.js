const MSWindowStartPosition = {
    TopLeft: 0,
    Center: 1
};

class MSWindow {
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
    let titlebar = this.wnd.querySelector("div.title-bar");
    let body = this.wnd.querySelector("div.window-body");
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

async function agentInit() {
    await wordballoonInit();
}



    const elements = {
        logonView: document.getElementById("logonView"),
        logonWindow: document.getElementById("logonWindow"),
        logonForm: document.getElementById("logonForm"),

        chatView: document.getElementById("chatView"),
    };

    let logonWindow = new MSWindow(elements.logonWindow, {
        width: 500,
        height: 275,
        hasClose: false,
        startPosition: MSWindowStartPosition.Center
    });

    logonWindow.show();

    elements.logonForm.addEventListener('submit', e => {
        e.preventDefault();

        logonWindow.hide();
        elements.logonView.style.display = "none";
        elements.chatView.style.display = "block";
    });
