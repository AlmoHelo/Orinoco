let order = JSON.parse(localStorage.getItem("order"));

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
insertName = (div, myName) => {
    let myP = document.createElement("p");
    myP.innerHTML = myName;
    mySection.appendChild(myP)
}
insertLine = (div, myId) => {
    let mySecondP = document.createElement("p");
    mySecondP.innerHTML = myId;
    mySection.appendChild(mySecondP)
}
const insertLink = (div, _id) => {
    let link = document.createElement("a");
    link.innerHTML = "<a href=page_accueil.html>Retour à la page d'accueil</a>";
    div.appendChild(link);
}

insertName(mySection, "Merci " + order.contact.firstName + " " + order.contact.lastName + " pour votre commande !");
insertLine(mySection, "Nous vous confirmons sa réception au n° " + order.orderId + " d'un prix total de " + sommeTotal / 100 + " €");
insertLink(mySection);