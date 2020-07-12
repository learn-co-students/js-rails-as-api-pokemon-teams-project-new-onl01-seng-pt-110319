const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


window.addEventListener('DOMContentLoaded', (event) => {
  fetch(TRAINERS_URL)
  .then(response=>response.json())
  .then(data=>{
    data.data.forEach((trainer) =>  console.log(trainer.attributes.name));
    console.log(data,data.data)
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

  card.appendChild(name)
  card.appendChild(addButton)
  const main = document.querySelector('main')
  main.appendChild(card)


}
