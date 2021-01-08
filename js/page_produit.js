let idPage = document.location.search.substr(3);        //récupère l'id

let myDiv = document.createElement("div");
myDiv.className = "DivTed";
let myFigure = document.createElement("figure");
myFigure.className = "imgTed";
let myFigcap = document.createElement("figcaption");
myFigcap.className = "figcapTed";
let myTitlePrice = document.createElement("div");
myTitlePrice.className = "titreetprixTed";
let myPDescription = document.createElement("div");
myPDescription.className = "descripTed";
let myListButton = document.createElement("div");
myListButton.className = "listetbuttonTed";
let myForm = document.createElement("form");
myForm.className = "couleurs";
myListButton.appendChild(myForm);
let myLabel = document.createElement("label");
myLabel.innerHTML = "Couleurs :  ";
myForm.appendChild(myLabel);
let mySelect = document.createElement("select")
mySelect.className = "sel"
myLabel.appendChild(mySelect);
let myBouton = document.createElement("button");
myBouton.className = "ajoutpanier";
myBouton.innerHTML = "Ajouter au panier";
myListButton.appendChild(myBouton);

function getRequestPromise() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", "http://localhost:3000/api/teddies/" + idPage);
        request.send();
        request.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject(XMLHttpRequest);
                }
            }
        }
    })
}

const mySec = document.getElementById("produit");

getRequestPromise()
    .then(function (response) {

        function thousands_separators(num)              //ajouter la virgule au prix
        {
            var num_parts = num.toString().split(".");
            num_parts[0] = num_parts[0].replace(/\B(?=(\d{2})+(?!\d))/g, ",");
            return num_parts.join(".");
        }
        const insertImage = (div, imageUrl) => {
            let img = document.createElement("img");
            img.src = imageUrl;
            myFigure.appendChild(img);
        }
        const insertName = (div, name) => {
            let h1 = document.createElement("h1");
            h1.innerHTML = name;
            div.appendChild(h1);
            myTitlePrice.appendChild(h1);
        }
        const insertPrice = (div, price) => {
            let pPrice = document.createElement("p");
            pPrice.innerHTML = price;
            div.appendChild(pPrice);
            myTitlePrice.appendChild(pPrice);
        }
        const insertDescriptif = (div, description) => {
            let p = document.createElement("p");
            p.innerHTML = description;
            div.appendChild(p);
            myPDescription.appendChild(p);
        }
        const insertColor = (div, colors) => {
            let myOption = document.createElement("option");
            myOption.innerHTML = colors;
            myOption.value = colors;
            mySelect.appendChild(myOption);
        }
        insertImage(myDiv, response.imageUrl);
        insertName(myFigcap, response.name);
        insertPrice(myFigcap, thousands_separators(response.price) + " €");
        insertDescriptif(myFigcap, response.description);

        let couleurs = response.colors;
        for (let i = 0; i < couleurs.length; i++) {
            insertColor(mySelect, couleurs[i]);
        }

        mySec.appendChild(myDiv);
        myDiv.appendChild(myFigure);
        myFigure.appendChild(myFigcap);
        myFigcap.appendChild(myTitlePrice);
        myFigcap.appendChild(myPDescription);
        myFigcap.appendChild(myListButton);


        let liste = document.querySelector("select");

        myBouton.onclick = function () {
            let tedProfil = {
                nom: response.name,
                prix: thousands_separators(response.price),
                couleur: liste.value,
                img: response.imageUrl,
                id: idPage,
                quantite: 1
            };

            if (localStorage.getItem('Peluche')) {
                let myTeddies = JSON.parse(localStorage.getItem('Peluche'))
                if (typeof myTeddies === "object" && !Array.isArray(myTeddies)) {
                    const tab = [myTeddies, tedProfil]
                    localStorage.setItem('Peluche', JSON.stringify(tab))
                } else {
                    myTeddies.push(tedProfil)
                    localStorage.setItem('Peluche', JSON.stringify(myTeddies))
                }
            } else {
                localStorage.setItem('Peluche', JSON.stringify(tedProfil))
            }
            return false;
        }
    })
    .catch(function (e) {
        console.log(e);
    });


