const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


class BirdsController < ApplicationController
  def index
    birds = Bird.all
    render json: birds
  end
end