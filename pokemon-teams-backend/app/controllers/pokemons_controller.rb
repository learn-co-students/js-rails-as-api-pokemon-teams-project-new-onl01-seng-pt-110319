class PokemonsController < ApplicationController
  def create
    pokemon=Pokemon.create(
      nickname: Faker::Name.first_name,
      species: Faker::Games::Pokemon.name,
      trainer_id: params[:trainer_id]
    )
    render json: pokemon
  end
end
