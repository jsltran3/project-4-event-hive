class BandsController < ApplicationController
    def create 
        # byebug
        # Previous attempt:
        # Band.create!(food_params)
        # NOTE:
        # This works within a Byebug console but is blocked by the fact that 'concert_ticket_id' is not allowed:
        # @current_user.bands.create!(band_params)

        # '@current_user' provides the 'user_id'
        # TODO
        # Take off the bang operator, !, and use byebug (and type band.full_messages) to figure out what's missing 
        # (which is most likely that you haven't provided a 'user_id' or 'concert_ticket_id'
        # food = @current_user.bands.create!(band_params)

        # Debugging the 'Band' issue's output:
        # .7.4 :003 > f = Band.create
        # => #<Band id: nil, user_id: nil, concert_ticket_id: nil, name: nil, created_at: nil, updated_at: nil>
        # 2.7.4 :004 > f.errors.full_messages
        # => ["User must exist", "ConcertTicket must exist", "Name can't be blank"] 
        food = @current_user.bands.create(band_params)
      
        # Look for 'band' object that has the id and the name
        # You need to figure out where all of the other stuff is coming from aka place a 'byebug' here and 
        # then print out what 'band' is showing --> 
        # Result: The 'concert_ticket_id' and 'user_id' from the serializer were the problem here
        # since I only need information regarding the food to be sent from the backend to the frontend
        # byebug
        render json: band, status: :created
    end

    def update
        # Using 'byebug' to debug 'user' display issue on 'View All Cookouts' page:
        # byebug
        band = @current_user.bands.find_by(id: params[:id])
        if band.user_id == @current_user.id
            band.update(band_params)
            render json: band
        else
            render json: { errors: [band.errors.full_messages] }, status: :unprocessable_entity
        end
    end

    def index 
        bands = @current_user.bands.all

        if session[:user_id]
            render json: bands
        else
            render json: { errors: ["Not authorized"] }, status: :unauthorized
        end
    end

    def show
        band = @current_user.bands.find_by(id: params[:id])
        if food 
            render json: band
        else
            render json: { error: "Band not found" }
        end
    end

    def destroy
        band = @current_user.bands.find_by(id: params[:id])
        if band.user_id == @current_user.id
            band.destroy
            head :no_content
        end
    end

    # Custom

    private 

    def band_params
        # NOTE: I added ':concert_ticket_id' to try to prevent weird creation validation issues:
        # params.permit(:name, :concert_ticket_id)
        # The resulting error from this will show that the nested 'band' key is an issue, but its not really a problem so it can be ignored:
        # "band"=>{"concert_ticket_id"=>2, "name"=>"Beatles"}
        params.permit(:name, :concert_ticket_id)
    end

end

