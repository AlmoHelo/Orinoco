let order = JSON.parse(localStorage.getItem("order"));
let i = 0;

let nomPrenom = document.getElementById("contact");
let idCommandeHTML = document.getElementById("nCmd");
let totalCommande = document.getElementById("totalCmd");

console.log(order.products)
console.log(order.contact)
console.log(order.orderId)

let idCommande = order.orderId;


insertID 