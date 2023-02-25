/* element constants */
const openFile = document.getElementById('open-file');
const openFolder = document.getElementById('open-folder');

/* text element constants */
const mainTextField = document.getElementById('mainTextField');

/* event listeners */
document.getElementById("open-file").addEventListener("click", openFilePrompt);

/* functions */
function openFilePrompt() {
    app.window.openFile();
}

/* read file */
window.indexBridge.fileData((event, filePath, fileData) => {
    console.log("file loading started");
    console.log("file path: " + filePath);
    console.log("file data: " + fileData);
    mainTextField.textContent = fileData;
})