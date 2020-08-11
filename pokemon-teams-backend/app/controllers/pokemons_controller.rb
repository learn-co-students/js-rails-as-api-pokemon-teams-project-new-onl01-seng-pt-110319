class PokemonsController < ApplicationController
    def create
        @trainer = Trainer.find_by(params[:id])
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: @trainer.id)
        pokemon.save
        render json: PokemonSerializer.new(@pokemon)
    end
    
    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.delete
        render json: PokemonSerializer.new(pokemon)
    end
end  
