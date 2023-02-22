class UserSerializer < ActiveModel::Serializer
  attributes :id, :user_name, :password_digest
end


attributes :id, :username

has_many :foods
has_many :cookouts, through: :foods
end
