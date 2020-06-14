const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded",function() {
	console.log("Loaded")
	fetchPokemonTeam()
})

function fetchPokemonTeam() {	
	fetch('http://localhost:3000/trainers')
	.then(resp => resp.json())
	.then(json => renderTeam(json))
}

function renderTeam(teams) {
	let main = document.querySelector('main')
	teams.data.forEach(team => {
		let divCard = document.createElement('div')
			divCard.setAttribute('class', 'card')
		let h2 = document.createElement('h2')
		h2.innerHTML = team.attributes.name
		main.append(divCard)
		divCard.appendChild(h2)

		let btn = document.createElement("button")
		btn.innerHTML = "Add Pokemon"
		divCard.appendChild(btn)

		btn.addEventListener("submit", event => {
			fetch('http://localhost:3000/pokemons', {
				method: 'POST',
    			headers: {
    			   'Content-Type': 'application/json',
    			    Accept: "application/json"
    			  },
    			body: JSON.stringify({
    				"nickname": 'Faker::Name.first_name',
    				"species": 'Faker::Games::Pokemon.name',
    				"trainer_id": team.attributes.id 
    			})
    			.then(res => res.json())
    			.then(obj => renderTeam(objec))
		})
		})

		team.attributes.pokemons.forEach(pokemon => {
			let li = document.createElement('li')
			li.innerHTML = pokemon.nickname + " " + "(" + pokemon.species + ")"
			divCard.appendChild(li)

			let dbtn = document.createElement('button')
			dbtn.innerHTML = "Release"
			li.appendChild(dbtn)

			dbtn.addEventListener("submit", event => {
				fetch('http://localhost:3000/pokemons/:pokemon_id', {
				method: 'DELETE',
    			headers: {
    			   'Content-Type': 'application/json',
    			    Accept: "application/json"
    			  },
    			body: JSON.stringify({
    				"nickname": 'Faker::Name.first_name',
    				"species": 'Faker::Games::Pokemon.name'
    			})
    			.then(res => res.json())
    			.then(obj => renderTeam(objec))
				})
			})
		})
	})
}