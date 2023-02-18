console.log("dropdown.js loaded");
/* bar buttons */
const fileMenu =  document.getElementById('file-menu');

/* dropdown menus */
const fileMenuDropdown = document.getElementById('file-dropdown-menu');

/* event listeners */
fileMenu.addEventListener("onclick", showFileDropdown);

/* show functions */
function showFileDropdown() {
    //fileMenuDropdown.hidden = !fileMenuDropdown.hidden;
    console.log("showFileDropdown() called"); //to do: make this work
}
