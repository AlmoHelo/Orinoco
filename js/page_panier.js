const myForm = document.querySelector('#formulaire')

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
console.log(pel)

let myArticle = document.createElement("div");
myArticle.className = "produitArticle";
let myFigure = document.createElement("figure");
let myFigcap = document.createElement("figcaption");
myFigcap.className = "produitFigcap";
let myQtePrix = document.createElement("div");
myQtePrix.className = "qteprix";
let link = document.createElement("h2");
let quantite = document.createElement("p");

if (pel == null || pel == "[]") {
    let vide = document.createElement("h1");
    vide.className = "h1prod"
    vide.textContent = "Votre panier est vide !";
    mySection.appendChild(vide)
} else {
    if (Array.isArray(myPeluche) == false) {

        let plein = document.createElement("h1");
        plein.className = "h1prod"
        plein.textContent = "Votre panier contient : ";
        mySection.appendChild(plein)

        //structure par peluche
        quantite.innerHTML = "Quantité : " + myPeluche.quantite;
        quantite.className = "qte";

        //lien vers la page du produit
        link.innerHTML = '<a href=page_produit.html?/:' + myPeluche.id + '>' + myPeluche.nom + '</a>';

        //insertion de chaque élément
        insertImage(myFigure, myPeluche.img)
        myFigcap.appendChild(link)
        insertColor(myFigcap, "Couleur choisie : " + myPeluche.couleur)
        insertCross(link);
        myQtePrix.appendChild(quantite)
        insertPrice(myQtePrix, "Prix : " + myPeluche.prix + " €")

        mySection.appendChild(myArticle);
        myArticle.appendChild(myFigure);
        myFigure.appendChild(myFigcap);
        myFigcap.appendChild(myQtePrix);

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

            annulerArticle = (m) => {
                let essaie = myPeluche.indexOf(myPeluche[m])
                let removedItem = myPeluche.splice(essaie, 1);
                localStorage.clear();
                let tabAfter = localStorage.setItem("Peluche", JSON.stringify(myPeluche));
                window.location.reload();
            }
            myCross.addEventListener("click", (event) => { this.annulerArticle(m); })
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


    //Regex
    let checkNumber = /[0-9]/;
    let checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let checkSpecialCharacter = /[§!@#$%^&*().?":{}|<>]/;

    let checkMessage = "";

    //récup des inputs
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let adresse = document.getElementById("adressep").value;
    let ville = document.getElementById("ville").value;
    let mail = document.getElementById("adressem").value;

    //vérification pour le nom
    if (checkNumber.test(nom) == true || checkSpecialCharacter.test(nom) == true) {
        checkMessage = "Veuillez vérifier les informations concernant votre nom. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
    } else {
        console.log("Nom accepté");
    }
    //vérification pour le prénom
    if (checkNumber.test(prenom) == true || checkSpecialCharacter.test(prenom) == true) {
        checkMessage = "Veuillez vérifier les informations concernant votre prénom. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
    } else {
        console.log("Nom accepté");
    }
    //vérification pour l'adresse postale
    if (checkSpecialCharacter.test(adresse) == true) {
        checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre adresse postale. Les caractères spéciaux ne sont pas autorisés";
    } else {
        console.log(" Adresse postale acceptée");
    }
    //vérification pour la ville
    if (checkSpecialCharacter.test(ville) == true || checkNumber.test(ville) == true) {
        checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre ville. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
    } else {
        console.log("Ville acceptée");
    }
    //vérification pour l'e-mail
    if (checkMail.test(mail) == false) {
        checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre email. Les caractères spéciaux ne sont pas autorisés";
      } else {
        console.log("Adresse mail acceptée");
      }

    //Vérifier si les champs sont conformes
    if (checkMessage != "") {
        alert("Attention certaines données ne sont pas conformes :" + "\n" + checkMessage);
    } else {
        //Si les champs sont conformes

        // recupére les valeurs du formulaire
        let contact = {                         
            firstName: nom,
            lastName: prenom,
            address: adresse,
            city: ville,
            email: mail
        }

        let products = [];

        //on récupère les produits
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

    }
    if (localStorage.getItem("order") != null) {
        let order = JSON.parse(localStorage.getItem("order"));
        nom.innerHTML = order.contact.firstName;
        prenom.innerHTML = order.contact.lastName;
        document.getElementById("orderId").innerHTML = order.orderID;
        console.log(order)
        localStorage.removeItem("order");
    } else {
        window.location = "./page_accueil.html";
        localStorage.removeItem("Peluche");
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
