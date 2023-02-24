class BandsController < ApplicationController
    def create 
 
        food = @current_user.bands.create(band_params)
      
        render json: band, status: :created
    end

    def update

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

