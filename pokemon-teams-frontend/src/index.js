// left off working with event listener on add pokemon button.

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function getAllTrainers() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => makeCard(json.data))
}

function makeCard(trainerArr) {
    trainerArr.forEach(trainer => {
        let cardUl = document.createElement("ul");

        let pokemonsArr = trainer.attributes.pokemons;
        pokemonsArr.forEach(pokemon => {
            let li = document.createElement("li");
            let releaseButton = document.createElement("button");
            releaseButton.innerText = "Release";
            releaseButton.classList.add("release");
            releaseButton.setAttribute("data-pokemon-id", pokemon.id);
            li.innerText = `${pokemon.nickname} (${pokemon.species})`;
            li.appendChild(releaseButton);
            cardUl.appendChild(li);
        })
        

        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        
        let cardPTag = document.createElement("p");
        cardPTag.innerText = trainer.attributes.name;

        let addPokemonButton = document.createElement("button");
        addPokemonButton.setAttribute("data-trainer-id", trainer.id);
        addPokemonButton.innerText = "Add Pokemon";
        addPokemonButton.classList.add("add-button");
        addPokemonButton.addEventListener("click", (event) => {
            console.log(`i am being clicked ${event}`);
        })


        cardDiv.appendChild(cardPTag);
        cardDiv.appendChild(addPokemonButton);
        cardDiv.appendChild(cardUl);
        document.body.appendChild(cardDiv);
    })
}

function addPokemonButtons() {
    let addBtns = document.getElementsByClassName("add-button");
}



document.addEventListener("DOMContentLoaded", () => {
    getAllTrainers();
    addPokemonButtons();
})