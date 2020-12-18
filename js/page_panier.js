let url = "http://localhost:3000/api/teddies/order";


function sendPost(url, toSend) {
    return new Promise((resolve, reject) => {
        let recovHttp = new XMLHttpRequest();
        recovHttp.open('POST', url);
        recovHttp.setRequestHeader('content-type', 'application/json');
        recovHttp.send(JSON.stringify(toSend));
        recovHttp.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status >= 200 && this.status <= 300) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject('encore une erreur');
                }
            }

        }
    });
}
/*
sendPost()
.then(function(response){
    response.preventDefault();
    
    const orderId = uuid();
    return response.status(201).json({
        contact: req.body.contact,
        products: teddies,
        orderId : orderId
    })
})
.catch(function(e){
    console.log(e);
});
//formulaire



let myBouton = document.querySelector('#bouton');
myBouton.onclick = function (e) {
    e.preventDefault();
sendPost()
.then(function(response){
        alert(JSON.parse(response.json()))
    }).catch(alert('fetch error'))

*/
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

    //boucle pour affichage des articles dans le panier

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
        //lien vers la page du produit
        link.innerHTML = '<a href=page_produit.html?/:' + myPeluche[m].id + '>' + myPeluche[m].nom + '</a>';
        let quantite = document.createElement("p");
        quantite.innerHTML = "Quantité : " + myPeluche[m].quantite;
        quantite.className = "qte";

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
            localStorage.removeItem(pel, myPeluche[m]);   //pour supprimer au clic  //a revoir !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            window.location.reload();       //pour rafraichir page
        }
        //console.log(myPeluche[m].id)   // récupère tous les id !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
    console.log(sommeTotal)

    totalPrix.textContent = "Total : " + sommeTotal + " €";
}



function getValue() {    // bouton envoyer

    let contact = {                         // recupére les valeurs du formulaire
        name: document.getElementById("nom").value,
        firstname: document.getElementById("prenom").value,
        address: document.getElementById("adressep").value,
        city: document.getElementById("ville").value,
        email: document.getElementById("adressem").value
    }
    if (localStorage.getItem('Contact')) {
        let myTeddies = JSON.parse(localStorage.getItem('Contact'))
        if (typeof myTeddies === "object" && !Array.isArray(myTeddies)) {
            const tab = [contact]
            localStorage.setItem('Contact', JSON.stringify(tab))
        } else {
            myTeddies.push(contact)
            localStorage.setItem('Contact', JSON.stringify(myTeddies))
        }
    } else {
        localStorage.setItem('Contact', JSON.stringify(contact))
    }

}

