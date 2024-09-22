let cantidadNoticias = 5;
let pageFinal = cantidadNoticias;
let pageInicial = 0;
let temaActual = "Tecnología";

let noticias = {
    "apiKey": "891d44cf144842d2a20d032585398491",
    fetchNoticias: function (categoria) {
        fetch("https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q="
            + categoria +
            "&language=es&apiKey=" + this.apiKey)
        
            .then((response) => response.json())
            .then((data) => this.displayNoticias(data));
    },

    displayNoticias: function (data) {
        if (!data.articles || data.articles.length === 0) {
            console.error("No se encontraron artículos.");
            return;
        }

        // Elimino todo si ha seleccionado un nuevo tema
        if (pageInicial == 0) {
            document.querySelector(".container-noticias").textContent = "";
        }

        for (let i = pageInicial; i < Math.min(pageFinal, data.articles.length); i++) {
            const { title } = data.articles[i];
            if (!title) continue; // Saltar si no hay título
        
            let h2 = document.createElement("h2");
            h2.textContent = title;
        
            const { urlToImage } = data.articles[i];
            let img = document.createElement("img");
            img.setAttribute("src", urlToImage || 'default-image.png'); // Mostrar imagen por defecto si no hay urlToImage
        
            let info_item = document.createElement("div");
            info_item.className = "info_item";
            
            const { publishedAt } = data.articles[i];
            let fecha = document.createElement("span");
            let date = publishedAt ? publishedAt.split("T")[0].split("-").reverse().join("-") : 'Fecha desconocida';
            fecha.className = "fecha";
            fecha.textContent = date;
        
            const { name } = data.articles[i].source;
            let fuente = document.createElement("span");
            fuente.className = "fuente";
            fuente.textContent = name;
        
            info_item.appendChild(fecha);
            info_item.appendChild(fuente);
        
            const { url } = data.articles[i];
            let item = document.createElement("div");
            item.className = "item";
            item.appendChild(h2);
            item.appendChild(img);
            item.appendChild(info_item);
            item.setAttribute("onclick", "location.href='" + url + "'");
            document.querySelector(".container-noticias").appendChild(item);
        }}
}



function buscar(cat) {
    pageInicial = 0;
    pageFinal = cantidadNoticias;
    temaActual = cat;
    noticias.fetchNoticias(cat);
}

function buscarTema() {
    pageInicial = 0;
    pageFinal = cantidadNoticias;

    let tema = document.querySelector("#busqueda").value;
    temaActual = tema;
    noticias.fetchNoticias(temaActual);
}

function siguiente() {
    pageInicial = pageFinal + 1;
    pageFinal = pageFinal + cantidadNoticias + 1;
    //eliminamos el botón siguiente
    document.querySelector("#btnSiguiente").remove();
    noticias.fetchNoticias(temaActual);

}

noticias.fetchNoticias(temaActual);