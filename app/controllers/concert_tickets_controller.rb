class ConcertTicketsController < ApplicationController
    def create 
        # byebug

        # Previously UNWORKING code to show the problem I fixed
        # cookout = @current_user.cookouts.create!(cookout_params)

        # NOTE: To step through the 'byebug' for this issue
        # 1. I put a byebug at the very top
        # 2. I then printed out '@current_user' and "@current_user.cookouts"
        # 3. I then realized the 'Cookout' model isn't tied to a user anymore since everyone needs to access a given cookout

        cookout = Cookout.create!(cookout_params)
        render json: cookout, status: :created
    end

    def update
        cookout = Cookout.find_by(id: params[:id])
        user_id = @current_user.id

        if cookout.users.find_by(id: user_id) 
            cookout.update(cookout_params) 
            render json: cookout
        # if cookout
        #     cookout.update(cookout_params)
        #     render json: cookout
        else
            render json: { errors: [cookout.errors.full_messages] }, status: :unprocessable_entity
        end
    end

    # Add full CRUD capability for this model
    def index 
        # byebug
        cookouts = Cookout.all

        if session[:user_id]
        # if @current_user
            render json: cookouts
        else
            render json: { errors: ["Not authorized"] }, status: :unauthorized
        end
    end

    def show
        cookout = Cookout.find_by(id: params[:id])
        if cookout 
            render json: cookout
        else
            render json: { error: "Cookout not found" }
        end
    end

    # This is a bug with Rails as per this Rails issue that was already acknowledged by their team, but will never be fixed:
    # https://github.com/rails/rails/issues/32376

    # What this means: 'destroy' literally has no way of adding validations, Rails will do it no matter what when it is called
    # even in scenarios where two models are dependent on each other, see this reply:
    # https://github.com/rails/rails/issues/32376#issuecomment-787461818

    # However, I can still add an 'else' section to provide a 'status' 400 in this scenario

    def destroy 
        cookout = Cookout.find_by(id: params[:id])
        user_id = @current_user.id
        
        if cookout.users.find_by(id: user_id) 
            cookout.destroy
            head :no_content
        else
            render json: { error: "Bad request, cannot be deleted" }, status: 400
        end
    end

    # Custom
    private 

    def cookout_params
        # byebug
        params.permit(:name, :start_time, :end_time)
    end
end
