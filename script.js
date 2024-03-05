const fileDrop = document.getElementById('msg');
const deposit = document.getElementById('deposit');
const depositP = document.getElementById('depositP');
const cancel = document.getElementById('cancel');
const sender = document.getElementById('sender');
const cancelError = document.getElementById('errorCancel');
const errorFile = document.getElementById('errorFile');

let maListe = [];

// Empêcher les événements dragenter et dragover par défaut pour permettre le dépôt
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    deposit.addEventListener(eventName, preventDefaults, false);
});

/*
 * Event for the cancel interface with the files deposit
 */
cancel.addEventListener('click', () => {
    deposit.style.display = 'none';
});
cancelError.addEventListener('click', () => {
    errorFile.style.display = 'none';
});
sender.addEventListener('click', () => {
    event.preventDefault();
    maListe.forEach(function(element){
        console.log(element.name);
    })
});

/* #====== OBSERVERS ======#
 * EventListener for the dragFiles
 * That will show and unshow the deposit interface
 */
fileDrop.addEventListener('dragenter', (event) => {
    event.preventDefault();
    deposit.style.display = 'flex';
});

deposit.addEventListener('drop', (event) => {
    event.preventDefault();
    deposit.style.display = 'none';

    const files = event.dataTransfer.files;
    handleFiles(files);
});

/*
 * Functions use here
 */
function handleFiles(files) {
    // Traitement des fichiers ici
    for (const file of files) {
        if(file.size > 5000){
            errorFile.style.display = 'flex';
            continue;
        }
        maListe.push(file);
    }
}
function preventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
}

