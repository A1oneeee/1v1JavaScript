const fileDrop = document.getElementById('msg');
const deposit = document.getElementById('deposit');
const depositP = document.getElementById('depositP');
const cancel = document.getElementById('cancel');

// Empêcher les événements dragenter et dragover par défaut pour permettre le dépôt
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    deposit.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
}

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

function handleFiles(files) {
    // Traitement des fichiers ici
    for (const file of files) {
        console.log('Nom du fichier:', file.name);
        console.log('Type du fichier:', file.type);
        console.log('Taille du fichier:', file.size, 'octets');
    }
}

cancel.addEventListener('click', () => {
    deposit.style.display = 'none';
});