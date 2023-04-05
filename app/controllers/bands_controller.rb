class BandsController < ApplicationController

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def create 
 
        band = @current_user.bands.create(band_params)
        
        if band.valid?
            render json: band, status: :created
        else 
            render json: { errors: ["Form can't be empty"] }, status: :unauthorized
        end

        # render json: band, status: :created


    end

    # def update

    #     user = User.find_by(id: session[:user_id])

    #     # band = @current_user.bands.find_by(id: params[:id])

    #     band = user.bands.find_by(id: params[:id])

    #     if band
    #         band.update(band_params)
    #         render json: band
    #     else
    #         render json: { errors: ["Form can't be empty"] }, status: :unprocessable_entity
    #         # render json: { errors: [band.errors.full_messages] }, status: :unprocessable_entity

    #     end
    # end

    def update

        user = User.find_by(id: session[:user_id])

        # band = @current_user.bands.find_by(id: params[:id])

        band = user.bands.find_by(id: params[:id])

        render json: band
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

    def render_unprocessable_entity(invalid)
        
        render json:{error: invalid.record.errors}, status: :unprocessable_entity

    end

    def band_params
        params.permit(:name, :band, :id, :concert_ticket_id)
    end

end

