/* element constants */
const openFile = document.getElementById('open-file');
const openFolder = document.getElementById('open-folder');

/* event listeners */
document.getElementById("open-file").addEventListener("click", openFilePrompt);

/* functions */
function openFilePrompt() {
    console.log("open file prompt");
}