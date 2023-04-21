class ConcertTicketSerializer < ActiveModel::Serializer


attributes :id, :title

has_many :bands
has_many :users, through: :bands

end
