/* dropdown menus */
const fileMenuDropdown = document.getElementById('file-dropdown-menu');
const editMenuDropdown = document.getElementById('edit-dropdown-menu');

/* event listeners */
document.getElementById("nav-file-open").addEventListener("click", showFileDropdown);
document.getElementById("nav-edit-open").addEventListener("click", showEditDropdown);

/* show functions */
function showFileDropdown() {
    closeAllDropdowns();
    fileMenuDropdown.hidden = !fileMenuDropdown.hidden;
}

function showEditDropdown() {
    closeAllDropdowns();
    editMenuDropdown.hidden = !editMenuDropdown.hidden;
}

function closeAllDropdowns() {

    fileMenuDropdown.hidden = true;
    editMenuDropdown.hidden = true;
}

/* close when clicking outside */
const popups = [document.getElementsByClassName('dropdown-menu')];
document.addEventListener("click", function(evnt){
    console.log(evnt.target.classList);
    evnt.target.classList.contains('nav-menu') ? null : closeAllDropdowns();
});
