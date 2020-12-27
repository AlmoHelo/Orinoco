let order = JSON.parse(localStorage.getItem("order"));

if (localStorage.length <= 0) {
    window.location = "./index.html";
} 

//recherche des éléments dans la page HTML
let mySection = document.getElementById("confirm");
let nomPrenom = document.getElementById("contact");
let idCommandeHTML = document.getElementById("nCmd");
let totalCommande = document.getElementById("totalCmd");
//récupération de la somme total des articles
let sommeTotal = 0;
let tableau = order.products;
tableau.forEach(element => sommeTotal += element.price)
//insertion des éléments dans la page HTML
let info = document.createElement("div");
info.className = "information";
insertName = (div, myName) => {
    let myP = document.createElement("p");
    myP.innerHTML = myName;
    info.appendChild(myP)
}
insertLine = (div, myId) => {
    let mySecondP = document.createElement("p");
    mySecondP.innerHTML = myId;
    info.appendChild(mySecondP)
}
const insertLink = (div, _id) => {
    let link = document.createElement("a");
    link.href="index.html"
    link.innerHTML = "Retour à la page d'accueil";
    div.appendChild(link);
}
mySection.appendChild(info)
insertName(info, "Merci " + order.contact.firstName + " " + order.contact.lastName + " pour votre commande !");
insertLine(info, "Nous vous confirmons sa réception au n° " + order.orderId + " d'un prix total de " + sommeTotal / 100 + " €");
insertLink(mySection);

let bouton = document.querySelector ("a");
console.log(bouton)
bouton.onclick = function (){
    localStorage.clear();
}