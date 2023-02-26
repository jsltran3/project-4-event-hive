class UserSerializer < ActiveModel::Serializer
  attributes :id, :user_name, :password_digest
end


attributes :id, :user_name

has_many :bands
has_many :concert_tickets, through: :bands
end
