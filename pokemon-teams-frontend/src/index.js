const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

document.addEventListener("DOMContentLoaded", () => loadTrainers())

//fetch data from API
const loadTrainers = () => {
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(json => {
        json.forEach(trainer => renderTrainer(trainer))
    }
)}

const renderTrainer = (trainerHash) => {
    // console.log(trainerHash)
    //trainerHash is the same as trainer in the fetch function
    //trainerHash's data can now be accessed via the arrow function
    //create elements
    const div = document.createElement("div")
    const p = document.createElement("p")
    const button = document.createElement("button")
    const ul = document.createElement("ul")

    //set attributes for each element
    div.setAttribute("class", "card")
    div.setAttribute("data-id", trainerHash.id)
    p.innerHTML = trainerHash.name
    button.setAttribute("data-trainer-id", trainerHash.id)
    button.innerHTML = "Add Pokemon"
    //attach event listener to button (click)
    button.addEventListener("click", createPokemon)

    //appendelements to DOM
    div.appendChild(p)
    div.appendChild(button)
    div.appendChild(ul)
    main.appendChild(div)

    trainerHash.pokemons.forEach(pokemon => renderPokemon(pokemon))

}

    const renderPokemon = (pokemon) => {
        //render pokemon in the uls

        //retrieve ul in reference to a specific trainer
        const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"`)
        const li = document.createElement("li")
        //create a button to append inside li
        const button = document.createElement("button")

        li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
        button.setAttribute("class", "release")
        button.setAttribute("data-pokemon-id", pokemon.id) 
        button.innerHTML = "Release"
        button.addEventListener("click", deletePokemon)
        //attach event listener to release

        li.appendChild(button)
        ul.appendChild(li)
    }

    const createPokemon = (e) => {
        e.preventDefault()
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({trainer_id: e.target.dataset.trainerId})
        }

        //whenever fetching via POST you should pass in the API url and the data submitted by the user which is in configobj
        fetch(POKEMONS_URL, configObj)
        .then(res => res.json())
        .then(json => {
            if (json.message){
                alert(json.message)
            } else {
                renderPokemon(json)
            }
        })
    }

    const deletePokemon = (e) => {
        e.preventDefault()
        const configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
        fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, configObj)
        e.target.parentElement.remove()
    }

