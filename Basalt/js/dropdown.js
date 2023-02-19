console.log("dropdown.js loaded");

/* dropdown menus */
const fileMenuDropdown = document.getElementById('file-dropdown-menu');

/* event listeners */
document.getElementById("nav-menu-open").addEventListener("click", showFileDropdown);

/* show functions */
function showFileDropdown() {
    fileMenuDropdown.hidden = !fileMenuDropdown.hidden;
}
