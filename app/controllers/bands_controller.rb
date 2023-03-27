class BandsController < ApplicationController
    def create 
 
        band = @current_user.bands.create(band_params)
      
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
        if band 
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

        params.permit(:name, :concert_ticket_id)
    end

end

