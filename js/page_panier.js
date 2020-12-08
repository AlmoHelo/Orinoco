/*let nomElt = document.getElementById("nom");
nomElt.value = "MonNom";*/

/*
let identite = new FormData();
identite.append("Nom", "Nom");
identite.append("Prenom", "Prenom");
identite.append("addresseP", "addresseP");
identite.append("ville", "ville");
identite.append("addresseM", "addresseM");

let req = new XMLHttpRequest();
req.open("POST", "http://localhost:3000/api/teddies");
req.send(identite);
*/

let url = "http://localhost:3000/api/teddies";
function ajaxPost(url, data, callback) {
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(data);
}
let identite = new FormData();
identite.append("Nom", "Nom");
identite.append("Prenom", "Prenom");
identite.append("addresseP", "addresseP");
identite.append("ville", "ville");
identite.append("addresseM", "addresseM");
ajaxPost("http://localhost:3000/api/teddies", identite,
    function (reponse) {
        console.log("Envoyée");
    }
);

let form = document.querySelector("formulaire");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(form);
    ajaxPost("http://localhost:3000/api/teddies", data, function () {});
});


/*
form.addEventListener("submit", function (e) {
    let nom = form.elements.nom.value;
    let prenom = form.elements.prenom.value;
    let addresseP = form.elements.addresseP.value;
    let ville = form.elements.ville.value;
    let addresseM = form.elements.addresseM.value;
    console.log("Nom : " + nom + ", prénom : " +
        prenom + ", adresse postale : " + addresseP + ", ville : " + ville + "et adresse mail : " + addresseM);
    if (form.elements.confirmation.checked === true) {
        console.log("Envoie données");
    } else {
        console.log("Erreur !");
    }
    e.preventDefault(); // Annulation de l'envoi des données
});*/