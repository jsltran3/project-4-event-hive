class Band < ApplicationRecord

    belongs_to :user
    belongs_to :concert_ticket

    validates :name, presence: true
end
