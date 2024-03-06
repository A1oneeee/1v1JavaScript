const discussion = document.getElementById('discussion');

const fileDrop = document.getElementById('msg');
const deposit = document.getElementById('deposit');
const depositP = document.getElementById('depositP');
const cancel = document.getElementById('cancel');
const sender = document.getElementById('sender');
const cancelError = document.getElementById('errorCancel');
const errorFile = document.getElementById('errorFile');

/* DIV RETURN BOTTOM */
const returnBottomBtn = document.getElementById('returnBottomBtn');
const returnBottom = document.getElementById('returnBottom');

/* DIV FILES TO SEND */
const storageFiles = document.getElementById('storageFiles');

let maListe = [];

/*
 * Load this function when the page is laoded
 */
window.onload = scrollToBottom;
window.addEventListener('scroll', actionScrollSeuil);


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
returnBottomBtn.addEventListener('click', () => {
    scrollToBottom();
    returnBottom.style.display ='none';
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
    if(maListe.length > 0){
        storageFiles.style.display = 'flex';
        var currentMarginBottom = parseInt(window.getComputedStyle(discussion).marginBottom);
        discussion.style.marginBottom = (currentMarginBottom + 20) + "px";
    }
    /* SHOW FILES IN CONTENEURS */
    maListe.forEach(function(element) {
        ajouterConteneur(element.name);
    });
});

/*
 * Functions use here
 */
function handleFiles(files) {
    // Traitement des fichiers ici
    let verif = false;
    for (const file of files) {
        if(file.size > 5000){
            // The size is too much
            verif = true;
            continue;
        }
        // Add to the list for adding in the page
        maListe.push(file);
    }
    if(verif == true){
        errorFile.style.display = 'flex';
    }
}
function preventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
}
function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight - window.innerHeight + 100,
        behavior: 'smooth' 
    });
}
// TODO: A optimiser
function actionScrollSeuil() {
    const seuil = document.body.scrollHeight - window.innerHeight*2.5;
    if (window.scrollY < seuil) {
        returnBottom.style.display = 'flex';
    } else 
    {
        returnBottom.style.display = 'none';
    }
}
function supprimerElementParNom(liste, nomElementASupprimer) {
    return liste.filter(function(element) {
        return element.name !== nomElementASupprimer;
    });
}
function supprimerConteneur(button) {
    var conteneur = button.parentNode;
    var texte = conteneur.querySelector('p').textContent;
    conteneur.parentNode.removeChild(conteneur);

    maListe = supprimerElementParNom(maListe, texte);

    if(maListe.length == 0){
        storageFiles.style.display = 'none';
        var currentMarginBottom = parseInt(window.getComputedStyle(discussion).marginBottom);
        discussion.style.marginBottom = (currentMarginBottom - 20) + "px";
    }
}
function ajouterConteneur(nomFichier) {
    var nouveauConteneur = document.createElement('div');
    nouveauConteneur.classList.add('conteneur');

    var paragraphe = document.createElement('p');
    paragraphe.textContent = nomFichier;

    // Créer un bouton
    var bouton = document.createElement('button');
    bouton.innerHTML = '<img src="assets/traverser.png">';
    bouton.addEventListener('click', function() {
        supprimerConteneur(this);
    });
    nouveauConteneur.appendChild(paragraphe);
    nouveauConteneur.appendChild(bouton);

    storageFiles.appendChild(nouveauConteneur);
}