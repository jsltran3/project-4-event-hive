class BandsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    
    before_action :authorize, only: [:update]
    # before_action :authorize


    # def create 
    #     user_id = User.find_by(id: session[:user_id])

    #     band = user_id.bands.create(band_params)
        
    #     if band.save
    #         render json: band, status: :created
    #     else 
    #         render json: { errors: band.errors.full_messages }, status: :unprocessable_entity
    #     end

    #         #     band = @current_user.bands.find_by(id: params[:id])
    # #     if band.user_id == @current_user.id
    # #         band.destroy
    # #         head :no_content
    # #     end
    # end

    def create
        user = User.find_by(id: session[:user_id])

        band = user.bands.create(band_params)
        render json: band, status: :created
    end

    # def create

    
    #     band = Band.new(band_params)
    #     band.concert_ticket = concert_ticket
    
    #     if band.save
    #       render json: band, status: :created
    #     else
    #       render json: { errors: band.errors.full_messages }, status: :unprocessable_entity
    #     end
    #   end



    # def update
    #     user_id = User.find_by(id: session[:user_id])
    #     # user_id = @current_user.bands.find_by(id: params[:id])

    #     # band = user_id.bands.find_by(id: params[:id])
    #     band = Band.find_by(id: params[:id])

    #     if band
    #         band.update!(band_params)
    #         render json: band
    #     else
    #         # render json: { errors: ["Form can't be empty"] }, status: :unprocessable_entity
    #         render json: { errors: band.errors.full_messages }, status: :unauthorized
            
    #     end
    # end

    #the one
    # def update
    #     band = @current_user.bands.find_by(id: params[:id])
    #     if band
    #       if band.update(band_params)
    #         render json: band
    #       else
    #         render json: { errors: band.errors.full_messages }, status: :unprocessable_entity
    #       end
    #     else
    #       render json: { errors: ["Band not found"] }, status: :not_found
    #     end
    #   end

    # def update
    #     band = Band.find(params[:id])
    #     concert_ticket = band.concert_ticket
    
    #     if concert_ticket.user != @current_user
    #       render json: { errors: ['Not authorized'] }, status: :unauthorized
    #       return
    #     end
    
    #     if band.update(band_params)
    #       render json: band, status: :ok
    #     else
    #       render json: { errors: band.errors.full_messages }, status: :unprocessable_entity
    #     end
    #   end
      

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

    # def destroy
    #     band = @current_user.bands.find_by(id: params[:id])
    #     if band.user_id == @current_user.id
    #         band.destroy
    #         head :no_content
    #     end
    # end

    # Custom

    private 

    def render_unprocessable_entity(invalid)
        render json:{error: invalid.record.errors}, status: :unprocessable_entity
    end

    def band_params
        params.permit(:name, :band, :id, :concert_ticket_id)
    end

    # def band_params
    #     permit(:name, :band, :id, :concert_ticket_id)
    #   end

    def current_user
        @current_user
    end

    def authorize
        # user_id = User.find_by(id: session[:user_id])

        render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
    end
      

end

