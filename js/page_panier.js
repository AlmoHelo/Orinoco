/*function localSto() {
    let local = document.getElementById('ted');

    let tedNom = localStorage.getItem("nom");
    let tedPrix = localStorage.getItem("prix");
    let tedCoul = localStorage.getItem("couleur");

    
    const insertName = (div, name) => {
        let p = document.createElement("p");
        p.innerHTML = name;
        local.appendChild(p);
    }
    
    insertName(local, tedNom.value);
}*/
/*
if (typeof localStorage!= 'undefined'){
    if('nom' in localStorage){
        alert('Message récupéré');
        document.getElementById('nom').value = localStorage.getItem('nom');
    }
} else {
    alert("localStorage n'est pas supporté");
}*/




let url = "http://localhost:3000/api/teddies/";

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
for (i = 0; i < localStorage.length; i++) {
    let pel = localStorage.key(i); //"peluche"
    let myPeluche = JSON.parse(window.localStorage.getItem(pel))

    let myArticle = document.createElement("div");
    myArticle.className = "produitArticle";
    let myFigure = document.createElement("figure");
    let myFigcap = document.createElement("figcaption");
    myFigcap.className = "produitFigcap";
    let link = document.createElement("h2");
    link.innerHTML = '<a href=page_produit.html?/:' + myPeluche.id + '>' + myPeluche.name + '</a>';

    insertImage(myFigure, myPeluche.img)
    myFigcap.appendChild(link)
    insertColor(myFigcap, "Couleur choisie : " + myPeluche.color)
    insertCross(link);
    insertPrice(myFigcap, "Prix : " + myPeluche.price + " €")

    mySection.appendChild(myArticle);
    myArticle.appendChild(myFigure);
    myFigure.appendChild(myFigcap);


    myCross.onclick = function (){
        localStorage.removeItem(pel);   //pour supprimer au clic
        window.location.reload();       //pour rafraichir page
    }

}

