class ConcertTicketSerializer < ActiveModel::Serializer
#   attributes :id, :title, :band_id, :user_id
# end

attributes :id, :title

has_many :bands
has_many :users, through: :bands
# has_many :users

end
