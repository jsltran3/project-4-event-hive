class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    def create
        # byebug
        user = User.create!(user_params)
        #create user object 

        #call the user.create method with the user parameters as arguments and sets it into lcaol variable user 
        new_user_id = user.id
        #getting the class variable out of it 
        session[:user_id] = new_user_id
        #setting a key in the session
        
        #how do you update a value in rub? 
        #its a magical local variable called sesshions. sessions is a hash, in my session hash go to where the user id stored in the hash and put user.id there
        #made the .id based on user to access it to get the information. 
        # we want to update the user id session to the what user id ismade 
        #exercise refresh on hash and how its works (adding, updating, getting)
        #in my own words, we use the session (hash) to take the hash map argument and sets it to the new user that we create
        #hash map = left title, right is. it's an instanc e
        #session = hash
        #:user_id is a key x
        #the new value user.id takes from line above
        render json: user, status: :created
    end

    def show
        render json: @current_user 
    end

    private 

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end
end
