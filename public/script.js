

function insereTexto(doc) {
    let noticia = doc.querySelectorAll("p.text"); 
    let ul = document.createElement("ul");
    noticia.forEach(not => {
        let li = document.createElement("li");
        li.innerHTML = not.innerHTML;
        ul.appendChild(li);
    })
    document.body.appendChild(ul);
}


function pegaDoc() {
    
    fetch("/scrape") 
    
    .then(response => {
    
        if(!response.ok) throw new Error("Erro no servidor proxy ou na execução"); 
        return response.text();
    })
    .then(dados => {
    
        let parser = new DOMParser();
        let doc = parser.parseFromString(dados, "text/html");
        insereTexto(doc);
    })
    .catch(error => alert("Ocorreu um erro: " + error));
}

function teste() {
    let botao = document.querySelector("button#btn");
    botao.addEventListener("click", evt => {
        pegaDoc();
    })
}

window.onload = teste;