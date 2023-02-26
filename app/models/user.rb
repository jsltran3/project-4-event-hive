class User < ApplicationRecord
    has_many :bands 
    has_many :concert_tickets, through: :bands

    has_secure_password

    validates :user_name, presence: true, uniqueness: true    
end
