const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


window.addEventListener('DOMContentLoaded', (event) => {
  fetch(TRAINERS_URL)
  .then(response=>response.json())
  .then(data=>{
    data.data.forEach((trainer) => createTrainerCard(trainer.attributes));
    data.included.forEach((pokemon) =>  addPokemon(pokemon.attributes));
    });
});

function createTrainerCard(trainer) {
  const card = document.createElement('div')
  card.className='card'
  card.setAttribute('data-id',trainer.id)
  const name=document.createElement('p')
  name.innerText=trainer.name
  const addButton = document.createElement('button')
  addButton.setAttribute('data-trainer-id',trainer.id)
  addButton.innerText='Add Pokemon'
  const team=document.createElement('ul')

  card.appendChild(name)
  card.appendChild(addButton)
  card.appendChild(team)
  const main = document.querySelector('main')
  main.appendChild(card)
}

function addPokemon(pokemon) {
  const teamMember=document.createElement('li')
  teamMember.innerText = `${pokemon.nickname} (${pokemon.species})`
  const releaseButton = document.createElement('button')
  releaseButton.innerText='Release'
  releaseButton.className='release'
  releaseButton.setAttribute('data-pokemon-id',pokemon.id)
  teamMember.appendChild(releaseButton)
  const trainerCard=document.querySelector(`[data-id='${pokemon.trainer_id}']`);
  const team=trainerCard.querySelector('ul')
  team.appendChild(teamMember)
}
