const mySection = document.getElementById("articles");

function getRequest() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", "http://localhost:3000/api/teddies");
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

getRequest()
    .then(function (response) {
        //ajouter la virgule au prix
        function thousands_separators(num){
            var num_parts = num.toString().split(".");
            num_parts[0] = num_parts[0].replace(/\B(?=(\d{2})+(?!\d))/g, ",");
            return num_parts.join(".");
        }
        const insertImage = (div, imageUrl) => {
            let img = document.createElement("img");
            img.className = "imgArticle";
            img.src = imageUrl;
            div.appendChild(img)
        }
        const insertName = (div, name) => {
            let h1 = document.createElement("h1");
            h1.innerHTML = name;
            div.appendChild(h1);
        }
        const insertDescriptif = (div, description) => {
            let p = document.createElement("p");
            p.className = "descripArticle";
            p.innerHTML = description;
            div.appendChild(p);
        }
        const insertPrice = (div, price) => {
            let pPrice = document.createElement("p");
            pPrice.innerHTML = price;
            pPrice.className = "Prix";
            div.appendChild(pPrice);
        }
        const insertLink = (div, _id) => {
            let link = document.createElement("a");
            link.innerHTML = '<a href=page_produit.html?/:' + _id + '>Voir le produit</a>';
            div.appendChild(link);
        }
        for (let i = 0; i < response.length; i++) {
            let myDiv = document.createElement("div");
            myDiv.className = "teddyArticle";
            let myFigure = document.createElement("figure");
            let myFigcap = document.createElement("figcaption");
            myFigcap.className = "figcapArticle";
            let myTitlePrice = document.createElement("div");
            myTitlePrice.className = "titreetprix";
            let bouton = document.createElement("button");

            insertImage(myFigure, response[i].imageUrl);
            insertName(myTitlePrice, response[i].name);
            insertPrice(myTitlePrice, thousands_separators(response[i].price) + " €");
            insertLink(bouton, response[i]._id);

            mySection.appendChild(myDiv);
            myDiv.appendChild(myFigure);
            myFigure.appendChild(myFigcap);
            myFigcap.appendChild(myTitlePrice);

            insertDescriptif(myFigcap, response[i].description);

            myDiv.appendChild(bouton);
        }
    })
    .catch(function (e) {
        console.log(e)
    })
console.log();



