// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`


const input = document.querySelector("input");
const inputValue = input.value;
const errorMsg = document.querySelector(".error-msg");
const resultsDisplay = document.querySelector(".results-display");
const loader = document.querySelector(".loader");

//->creation de card pour chaque resultats

const createCard = (data) => {
    //=en cas de result vide
    if (!data.length) {
        errorMsg.textContent = "Aiee!! aucun resultat..";
        loader.style.display = "none";
        return;
    }
    //=pour chaque result je veux creer une card
    data.forEach(element => {

        const url = `https://en.wikipedia.org/?curid=${element.pageid}`;

        const card = document.createElement("div");
        card.className = "result-item";
        card.innerHTML = `
        <h3 class="result-title">
        <a href=${url} target="_blank">${element.title}</a>
        </h3>
        <a class="result-link" href=${url} target="_blank">${url}</a>
        <span class="result-snippet">${element.snippet}</span>
        <br>
        `;
        //=je return le result
        resultsDisplay.appendChild(card);
    });
    loader.style.display = "none";

}
//-> call api wikipedia

const wikiCall = async (searchInput) => {
    try {
        const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`)
        // console.log(response);
        //->en cas d'erreur url affichage sur la page
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json()
        // console.log(data);
        const createCard = (data.query.search);
    }
    catch (error) {
        errorMsg.textContent = `${error}`;
        loader.style.display = "none";

    }
}

const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue === "") {
        errorMsg.textContent = "Merci de remplir le champs ";
        return;
    } else {
        errorMsg.textContent = "";
        loader.style.display = "flex";
        resultsDisplay.textContent = "";
        wikiCall(inputValue)
    }
}
const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);