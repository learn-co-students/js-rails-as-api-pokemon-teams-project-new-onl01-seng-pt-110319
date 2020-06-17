const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
    getTrainers()
})

let main = document.querySelector("main")
//comment to submit

function getTrainers() {
    return fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(data => {
       data.data.forEach(trainer => addTrainer(trainer))
    })

}
let ul = document.createElement("ul")

function addTrainer(trainer) {
    let card = document.createElement("div")
    card.setAttribute("class", "card")
    card.setAttribute("data-id", trainer.id)
    let button = document.createElement("button")
    button.setAttribute("data-trainer-id", trainer.id)
    button.addEventListener("click", addPokemonToTeam)
    button.innerText = "Add Pokemon"
    
    trainer.attributes.pokemons.forEach(pokemon=> {
        console.log('pokemon', pokemon)
        addPokemonToDom(pokemon)
    })

    card.append(button, ul)
    main.appendChild(card)
}

function addPokemonToTeam(e) {
    
    fetch(POKEMONS_URL, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({trainer_id: e.target.dataset.trainerId})
    })
    .then(response => response.json())
    .then(data => {
        console.log("dta", data.data.attributes)
        addPokemonToDom(data.data.attributes)
    })
 }

 function removePokemonFromTeam(e) {
    
    fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, {
        method: "DELETE",
    })
    .then(response => response.json())
    .then(e.target.parentNode.remove())
    .catch(message=> {
        console.log("there was an error", message)
    })
    // //add fetch request to remove from api
}


function addPokemonToDom(pokemon) {
    let li = document.createElement("li")
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        let trainerButton = document.createElement("button")
        trainerButton.setAttribute("class", "release")
        trainerButton.setAttribute("data-pokemon-id", pokemon.id)
        trainerButton.innerText = "Release"
        trainerButton.addEventListener("click", removePokemonFromTeam)
        li.appendChild(trainerButton)
        ul.appendChild(li)
}