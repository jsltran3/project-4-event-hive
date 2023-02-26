class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest
end


attributes :id, :username

has_many :bands
has_many :concert_tickets, through: :bands
end
