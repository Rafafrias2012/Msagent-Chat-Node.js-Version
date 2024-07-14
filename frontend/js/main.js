const elements = {
    logonView: document.getElementById("logonView"),
    logonWindow: document.getElementById("logonWindow"),
    logonForm: document.getElementById("logonForm"),

    chatView: document.getElementById("chatView"),
}

const MSWindow = require("./MSWindow.js");
const MSWindowStartPosition = require("./MSWindow.js").MSWindowStartPosition;

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
