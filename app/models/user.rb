class User < ApplicationRecord
    has_many :concert_tickets
    has_many :concerts, through: :concert_tickets
    
end
