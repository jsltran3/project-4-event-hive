class Band < ApplicationRecord
    has_many :concert_tickets
    has_many :users, through: :concert_tickets

end
