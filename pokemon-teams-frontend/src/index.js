const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', () => {
    return fetch(TRAINERS_URL)
    .then(resp=> resp.json())
    .then(data => {
        data.data.forEach(trainer=> trainerCard(trainer))});
});

// trainersCard
function trainerCard(trainer){
    // div with card class
    // console.log('trainer cards', trainer)
    const div = document.createElement('div');
    div.setAttribute('class', 'card');
    div.setAttribute('data-id', trainer.id)
    main.appendChild(div);
    // p with name
    const p = document.createElement('p');
    p.innerHTML = `${trainer.attributes.name}`;
    div.appendChild(p);
    //  button for add
    const btn = document.createElement("button");
    btn.setAttribute('data-trainer-id', trainer.id);
    btn.innerHTML = "Add Pokemon";
    btn.addEventListener("click", addPokemon);
    div.appendChild(btn);
    // ul of pokemon
    const ul = document.createElement("ul");
    div.appendChild(ul);
    trainer.attributes.pokemons.forEach(pokemon=> {
        // console.log('pokemon cards', pokemon)
        getPokemon(pokemon);
    })
}

// get pokemon
function getPokemon(pokemon){
    // grab div ul
    const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`);
    // li for pokemon
    const li = document.createElement('li');
    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`;
    ul.appendChild(li)
    // button for release
    const btn = document.createElement('button');
    btn.innerHTML = "Release";
    btn.setAttribute("class", "release");
    btn.setAttribute("data-pokemon-id", pokemon.id);
    btn.addEventListener("click", releasePokemon);
    li.appendChild(btn);
}

// add pokemon
function addPokemon(e){
    fetch(POKEMONS_URL, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({trainer_id: e.target.dataset.trainer_id})
    })
    .then(response => response.json())
    .then(data => {
        console.log("dta", data.data.attributes)
        getPokemon(data.data.attributes)
    })
 }
// release pokemon
function releasePokemon(e){
    
    fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, {
        method: "DELETE",
    })
    .then(response => response.json())
    .then(e.target.parentNode.remove())
    .catch(message=> {
        console.log("there was an error", message)
    })
}