const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// When a user loads the page, they should see all trainers, with their current team of Pokemon.
// Whenever a user hits "Add Pokemon" and they have space on their team, they should get a new Pokemon.
// Whenever a user hits "Release Pokemon" on a specific Pokemon team, that specific Pokemon should be released from the team.

function getInfo() {
    fetch(TRAINERS_URL)
   .then(response => response.json())
   .then(json => makeCard(json.data))
}

   


function makeCard(trainers) {
    
    let wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')

    trainers.forEach(function(trainer) {
       

        let ulTag = document.createElement('ul')
        
        let pokemonInfo = trainer.attributes.pokemons 
        pokemonInfo.forEach(function(pokemonDetails) { 

            let liTag = document.createElement('li') 

            liTag.innerHTML = `${pokemonDetails.nickname} (${pokemonDetails.species})`
            liTag.setAttribute('data-pokemon-id', pokemonDetails.id )
           
        


            let releaseButton = document.createElement("BUTTON")
            releaseButton.textContent = "Release"
            releaseButton.classList.add('release')

            releaseButton.addEventListener("click", function(event) {
                event.preventDefault()
                releasePokemon(event)

            })

            ulTag.appendChild(liTag)
            liTag.appendChild(releaseButton)
            
        })


        let div = document.createElement('div')
        div.classList.add('card')
        div.setAttribute("data-id", trainer.id)



        let pTag = document.createElement('p')
        pTag.innerText = trainer.attributes.name


        let addButton = document.createElement("BUTTON")
        addButton.setAttribute("data-trainer-id", trainer.id)
        addButton.id == trainer.id
        addButton.textContent = "Add Pokemon"

        addButton.addEventListener("click", function(event) {
            event.preventDefault()
            let details = event.target.dataset
            getNewPokemon(details)
            
           
        })





        div.appendChild(pTag)
        div.appendChild(addButton)
        div.appendChild(ulTag)
        wrapper.appendChild(div)
        

    })
document.body.appendChild(wrapper)
}

function getNewPokemon(newPokemon) {
    fetch(POKEMONS_URL, {
        
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            trainer_id: newPokemon.trainerId
           
        })
    }) 
    .then(function(response) {
        return response.json();
    })
    .then(function(object) {
        let data = object.data
        addNewPokemon(data)
    })
}

function addNewPokemon(data) {

    let matches = document.querySelector("[data-id= '"+ data.relationships.trainer.data.id + "']");

    let ulTag = matches.querySelector('ul')

    let newLi = document.createElement('li')
    newLi.innerHTML = `${data.attributes.species} (${data.attributes.species})`
    newLi.setAttribute('data-pokemon-id', data.id )

    let releaseButton = document.createElement("BUTTON")
    releaseButton.textContent = "Release"
    releaseButton.classList.add('release')


    newLi.appendChild(releaseButton)
    ulTag.appendChild(newLi)

    matches.appendChild(ulTag)

}

function releasePokemon(data) {

    let matches = document.querySelector("[data-trainer-id= '"+ data.target.parentElement.parentElement.parentElement.children[1].dataset.trainerId + "']");
    
    let remove = matches.parentElement.children[2].firstChild.remove()


    let id = data.target.parentNode.dataset.pokemonId


   
    return fetch(`http://localhost:3000/pokemons/${id}`, { method: 'DELETE' })
}





document.addEventListener('DOMContentLoaded', (event) => {
    getInfo()
});