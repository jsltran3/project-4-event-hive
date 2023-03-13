class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  
  before_action :authorize

  private

  def authorize
    # NOTE: This is exactly how the /concert_tickets route knows what user has logged in since when the user logs in, 
    # This information is passed in via the params
    #finding the user and storing it as a cooking in sesh hash
    @current_user = User.find_by(id: session[:user_id])
  
    render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

end


