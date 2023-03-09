class ConcertTicket < ApplicationRecord    
    # has_many :bands
    # NOTE: We want to use the 'dependent: ' parameter since we want 'bands' to be destroyed if a concert is destroyed:
    # Look for 'dependent':
    # https://guides.rubyonrails.org/association_basics.html
    # belongs_to :user
    # belongs_to :concert

    has_many :bands, dependent: :destroy
    has_many :users, through: :bands 

    validates :name, presence: true

end
