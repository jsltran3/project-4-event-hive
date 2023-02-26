class ConcertTicketsController < ApplicationController
    def create 

        concert_ticket = Concert_Ticket.create!(concert_ticket_params)
        render json: concert_ticket, status: :created
    end

    def update
        concert_ticket = Concert_Ticket.find_by(id: params[:id])
        user_id = @current_user.id

        if concert_ticket.users.find_by(id: user_id) 
            concert_ticket.update(concert_ticket_params) 
            render json: concert_ticket

        else
            render json: { errors: [concert_ticket.errors.full_messages] }, status: :unprocessable_entity
        end
    end

    # Add full CRUD capability for this model
    def index 
        # byebug
        concert_tickets = Concert_Ticket.all

        if session[:user_id]
            render json: concert_tickets
        else
            render json: { errors: ["Not authorized"] }, status: :unauthorized
        end
    end

    def show
        concert_ticket = Concert_Ticket.find_by(id: params[:id])
        if concert_ticket 
            render json: concert_ticket
        else
            render json: { error: "Concert Ticket not found" }
        end
    end

    # This is a bug with Rails as per this Rails issue that was already acknowledged by their team, but will never be fixed:
    # https://github.com/rails/rails/issues/32376

    # What this means: 'destroy' literally has no way of adding validations, Rails will do it no matter what when it is called
    # even in scenarios where two models are dependent on each other, see this reply:
    # https://github.com/rails/rails/issues/32376#issuecomment-787461818

    # However, I can still add an 'else' section to provide a 'status' 400 in this scenario

    def destroy 
        concert_ticket = Concert_Ticket.find_by(id: params[:id])
        user_id = @current_user.id
        
        if concert_ticket.users.find_by(id: user_id) 
            concert_ticket.destroy
            head :no_content
        else
            render json: { error: "Bad request, cannot be deleted" }, status: 400
        end
    end

    # Custom
    private 

    def concert_ticket_params
        # byebug
        params.permit(:name, :start_time, :end_time)
    end
end
