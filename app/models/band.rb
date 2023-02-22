class Band < ApplicationRecord
    # has_many :concert_tickets
    # has_many :users, through: :concert_tickets

    # We have 3 validations, 2 from 'belongs_to' as well as validates
    # All 3 have to be provided to create Food
    belongs_to :user
    belongs_to :concert_tickets

    validates :name, presence: true
end
