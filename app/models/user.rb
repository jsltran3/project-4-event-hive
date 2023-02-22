class User < ApplicationRecord
    has_many :bands 
    has_many :concert_tickets, through: :bands

    has_secure_password

    validates :username, presence: true, uniqueness: true    
end
