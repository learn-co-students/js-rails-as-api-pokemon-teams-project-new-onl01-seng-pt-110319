class PokemonsController < ApplicationController
    def create
        
        @pokemon = Pokemon.new(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: params[:trainer_id])
        
        
        if @pokemon.save
            render json: PokemonSerializer.new(@pokemon)
        else
            render json: {message: "Pokemon could not be created"}
        end
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.delete
    end
end
