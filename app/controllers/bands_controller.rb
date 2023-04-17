class BandsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    
    before_action :authorize, only: [:update]


    def create 
        user_id = User.find_by(id: session[:user_id])

        band = user_id.bands.create!(band_params)
        
        if band.save
            render json: band, status: :created
        else 
            render json: { errors: band.errors.full_messages }, status: :unprocessable_entity
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

    private 

    def render_unprocessable_entity(invalid)
        render json:{error: invalid.record.errors}, status: :unprocessable_entity
    end

    def band_params
        params.permit(:name, :band, :id, :concert_ticket_id)
    end

    def current_user
        @current_user
    end

    def authorize
        # user_id = User.find_by(id: session[:user_id])

        render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
    end
      

end

