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

function sendPost(url, toSend){
    return new Promise((resolve, reject) => {
        let recovHttp= new XMLHttpRequest();
        recovHttp.open('POST', url);
        recovHttp.setRequestHeader('content-type', 'application/json');
        recovHttp.send(JSON.stringify(toSend));
        recovHttp.onreadystatechange = function() {
            if(this.readyState === XMLHttpRequest.DONE) {
                if(this.status >= 200 && this.status <= 300) {  
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject('encore une erreur');
                }
            }
         
        }
    });
}

sendPost()
.then()
.catch();
console.log();