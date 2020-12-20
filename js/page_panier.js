const myForm = document.querySelector('#formulaire')
//formulaire


//liste des produits
let mySection = document.getElementById("produits");

const insertImage = (div, imageUrl) => {
    let img = document.createElement("img");
    img.className = "produitImg";
    img.src = imageUrl;
    div.appendChild(img)
}
const insertName = (div, name) => {
    let h2 = document.createElement("h2");
    h2.innerHTML = name;
    div.appendChild(h2);
}
const insertPrice = (div, price) => {
    let pPrice = document.createElement("p");
    pPrice.innerHTML = price;
    pPrice.className = "produitPrix";
    div.appendChild(pPrice);
}
const insertColor = (div, color) => {
    let col = document.createElement("p");
    col.className = "colProduit";
    col.innerHTML = color;
    div.appendChild(col);
}

let myCross = "";

const insertCross = (div) => {
    myCross = document.createElement("i");
    myCross.className = "fa fa-times";
    div.appendChild(myCross);
}

//recupération des Peluches sur le local storage
let pel = localStorage.getItem("Peluche");
let myPeluche = JSON.parse(pel);

if (pel == null) {
    mySection.textContent = "Votre panier est vide !";
} else {
    for (let m = 0; m < myPeluche.length; m++) {

        //structure par peluche
        let myArticle = document.createElement("div");
        myArticle.className = "produitArticle";
        let myFigure = document.createElement("figure");
        let myFigcap = document.createElement("figcaption");
        myFigcap.className = "produitFigcap";
        let myQtePrix = document.createElement("div");
        myQtePrix.className = "qteprix";
        let link = document.createElement("h2");
        let quantite = document.createElement("p");
        quantite.innerHTML = "Quantité : " + myPeluche[m].quantite;
        quantite.className = "qte";

        //lien vers la page du produit
        link.innerHTML = '<a href=page_produit.html?/:' + myPeluche[m].id + '>' + myPeluche[m].nom + '</a>';

        //insertion de chaque élément
        insertImage(myFigure, myPeluche[m].img)
        myFigcap.appendChild(link)
        insertColor(myFigcap, "Couleur choisie : " + myPeluche[m].couleur)
        insertCross(link);
        myQtePrix.appendChild(quantite)
        insertPrice(myQtePrix, "Prix : " + myPeluche[m].prix + " €")

        mySection.appendChild(myArticle);
        myArticle.appendChild(myFigure);
        myFigure.appendChild(myFigcap);
        myFigcap.appendChild(myQtePrix);

        myCross.onclick = function () {


            window.location.reload();       //pour rafraichir page
        }


    }
    // somme totale de tous les produits
    let totalPrix = document.createElement("p");
    totalPrix.id = "sommeTotal";
    mySection.appendChild(totalPrix);

    let sommeTotal = 0;

    for (let p = 0; p < myPeluche.length; p++) {
        let conversion = parseFloat(myPeluche[p].prix);
        sommeTotal += conversion;
    }
    totalPrix.textContent = "Total : " + sommeTotal + " €";
}

myForm.addEventListener('submit', function (e) {
    e.preventDefault()

    // return console.log("submit")
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let adresse = document.getElementById("adressep").value;
    let ville = document.getElementById("ville").value;
    let mail = document.getElementById("adressem").value;

    //const regexNom = new RegExp("[a-zA-Z]+$", "g");
    //const regexAddress = new RegExp("[0-9]*) ?([a-zA-Z,\. ]*) ?([0-9]{5}) ?([a-zA-Z]*");
    //const regexEmail = new RegExp("[\w-\.]+@[\w\.]+\.{1}[\w]+");

    /* if (regexNom.test(nom) == false) {
         alert("Le nom saisie n'est pas valide")
     }
     if (regexNom.test(prenom) == false) {
         alert("Le prénom saisie n'est pas valide")
     }
     if (regexAddress.test(adresse) == false) {
         alert("L'adresse postale saisie n'est pas valide")
     }
     if (regexNom.test(ville) == false) {
         alert("La ville saisie n'est pas valide")
     }
     if (regexEmail.test(mail) == false) {
         alert("L'adresse mail saisie n'est pas valide")
     }*/

    let contact = {                         // recupére les valeurs du formulaire
        firstName: nom,
        lastName: prenom,
        address: adresse,
        city: ville,
        email: mail
    }

    let products = [];

    for (let i = 0; i < myPeluche.length; i++) {
        let tedID = myPeluche[i].id;
        products.push(tedID)
    }
    let toSend = { contact, products };

    sendPost("http://localhost:3000/api/teddies/order", toSend)
        .then(function (response) {
            console.log(response)
        })
        .catch(function (e) {
            console.log(e);
        });

    if (localStorage.getItem("order") != null) {
        let order = JSON.parse(localStorage.getItem("order"));
        nom.innerHTML = order.contact.firstName;
        prenom.innerHTML = order.contact.lastName;
        document.getElementById("orderId").innerHTML = order.orderID;
        console.log(order)
        localStorage.removeItem("order");
    } else {
        alert("Merci pour votre commande. A bientôt !");
        window.location = "./page_accueil.html";
    }
})
let url = "http://localhost:3000/api/teddies/order";
function sendPost(url, toSend) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('POST', url);
        request.setRequestHeader('content-type', 'application/json');
        request.send(JSON.stringify(toSend));
        request.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status >= 200 && this.status <= 300) {
                    localStorage.setItem("order", this.responseText)
                    window.location = "./page_confirmation.html"
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject('encore une erreur');
                }
            }
        }
    });
}
