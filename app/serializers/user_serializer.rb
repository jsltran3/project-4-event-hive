class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :bands
  # has_many :concert_tickets, through: :bands
  has_many :concert_tickets

end
