const MINUS_APP = document.getElementById('minimize-app');
const CLOSE_APP = document.getElementById('close-app');

MINUS_APP.addEventListener("click", minimizeApp);
CLOSE_APP.addEventListener("click", closeApp);

console.log("window.js loaded"); //debug

function minimizeApp() {
    app.window.minimize();
    console.log("minimizeApp() called");
}

function closeApp() {
    app.window.close();   
    console.log("closeApp() called")
}
