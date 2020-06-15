// left off working with event listener on add pokemon button.

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

class Pokemon {
    constructor(id, species, nickname, trainer_id) {
        this.id = id;
        this.species = species;
        this.nickname = nickname;
        this.trainer_id = trainer_id;
    }
}

class Trainer {
    constructor(name, id, pokemons) {
        this.name = name;
        this.id = id;
        this.pokemons = pokemons;
    }
}

function getTrainersAndTheirPokemon() {
    getFetch();
}

function getFetch() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => mapTrainersArray(json.data))
}

function mapTrainersArray(trainersArray) {
    trainersArray.map(trainer => makeNewTrainer(trainer))
}

function makeNewTrainer(trainer) {
    let name = trainer.attributes.name;
    let id = trainer.id;
    let pokemonsArr = trainer.attributes.pokemons;
    let trainerPokemons = pokemonsArr.map(pokemon => makeNewPokemon(pokemon));
    let newTrainer = new Trainer(name, id, trainerPokemons);
    document.body.appendChild(makeTrainerCard(newTrainer));
    document.body.appendChild(document.createElement("br"));
}

function makeNewPokemon(pokemon) {
    let id = pokemon.id;
    let species = pokemon.species;
    let nickname = pokemon.nickname;
    let trainerId = pokemon.trainer_id;
    let newPokemon = new Pokemon(id, species, nickname, trainerId);
    return newPokemon;
}

function makeTrainerCard(trainer) {
    let finalCard = makeTrainerDiv(trainer);
    let pTag = makePTag(trainer);
    let addBtn = makeAddPokemonButton(trainer);
    let uL = makeUL();
    let lIs = trainer.pokemons.map(pokemon => createTrainerPokemonLi(pokemon));

    lIs.forEach(li => uL.appendChild(li));

    finalCard.appendChild(pTag);
    finalCard.appendChild(addBtn);
    finalCard.appendChild(uL);
    return finalCard;
}

function makeTrainerDiv(trainer) {
    let trainerDiv = document.createElement("div");
    trainerDiv.setAttribute("class", "card");
    trainerDiv.setAttribute("data-id", trainer.id);
    return trainerDiv;
}

function makePTag(trainer) {
    let trainerPTag = document.createElement("p");
    trainerPTag.innerText = trainer.name;
    return trainerPTag;
}

function makeAddPokemonButton(trainer) {
    let addButton = document.createElement("button");
    addButton.setAttribute("data-trainer-id", trainer.id);
    addButton.innerText = "Add Pokemon";
    return addButton;
}

function makeUL() {
    let uL = document.createElement("ul");
    return uL;
}

function createTrainerPokemonLi(pokemon) {
    let li = document.createElement("li");
    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`;
    li.appendChild(createReleaseButton(pokemon));
    return li;
}

function createReleaseButton(pokemon) {
    let button = document.createElement("button");
    button.classList.add("release");
    button.setAttribute("data-pokemon-id", pokemon.id);
    button.innerText = "Release";
    return button;
}

document.addEventListener("DOMContentLoaded", () => {
    getTrainersAndTheirPokemon();
})























// function getAllTrainers() {
//     fetch(TRAINERS_URL)
//     .then(response => response.json())
//     .then(json => makeCard(json.data))
// }

// function makeCard(trainers) {
//     trainers.forEach(trainer => {
//         let cardUl = document.createElement("ul");

//         let pokemonsArr = trainer.attributes.pokemons;
//         pokemonsArr.forEach(pokemon => {
//             let li = document.createElement("li");
//             let releaseButton = document.createElement("button");
//             releaseButton.innerText = "Release";
//             releaseButton.classList.add("release");
//             releaseButton.setAttribute("data-pokemon-id", pokemon.id);
//             li.innerText = `${pokemon.nickname} (${pokemon.species})`;
//             li.appendChild(releaseButton);
//             cardUl.appendChild(li);
//         })
        

//         let cardDiv = document.createElement("div");
//         cardDiv.classList.add("card");
//         cardDiv.dataset.id = trainer.id;

//         let cardPTag = document.createElement("p");
//         cardPTag.innerText = trainer.attributes.name;

//         let addPokemonButton = document.createElement("button");
//         addPokemonButton.setAttribute("data-trainer-id", trainer.id);
//         addPokemonButton.innerText = "Add Pokemon";
//         addPokemonButton.classList.add("add-button");
//         addPokemonButton.addEventListener("click", event => {
//             console.log(event.path[0].dataset.trainerId);
//             fetch(POKEMONS_URL, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "Application/json"
//             },
//             body: JSON.stringify({
//                 trainer_id: event.path[0].dataset.trainerId
//             })
//         })
//         .then(response => response.json())
//         .then(pokemon => {
//             let li = document.createElement("li");
//             let releaseButton = document.createElement("button");
//             releaseButton.innerText = "Release";
//             releaseButton.classList.add("release");
//             releaseButton.setAttribute("data-pokemon-id", pokemon.data.id);
//             li.innerText = `${pokemon.data.attributes.nickname} (${pokemon.data.attributes.species})`;
//             li.appendChild(releaseButton);
//             cardUl.appendChild(li);
//         })
//     });


//         cardDiv.appendChild(cardPTag);
//         cardDiv.appendChild(addPokemonButton);
//         cardDiv.appendChild(cardUl);
//         document.body.appendChild(cardDiv);
//     })
// }

// // function addPokemonButtons(event) {
// //     console.log(event);
// //     fetch(POKEMONS_URL, {
// //         method: "POST",
// //         headers: {
// //             "Content-Type": "application/json",
// //             "Accept": "Application/json"
// //         },
// //         body: JSON.stringify({

// //         })
// //     })
// // }




// document.addEventListener("DOMContentLoaded", () => {
//     getAllTrainers();
// })