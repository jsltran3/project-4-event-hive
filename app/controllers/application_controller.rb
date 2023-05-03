class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  
  before_action :authorize

  private

  def authorize
    @current_user = User.find_by(id: session[:user_id])
    #maybe call the rescue the in the function 
    render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
  end
  
#explain this method why it's rendering full error message 
  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

end


