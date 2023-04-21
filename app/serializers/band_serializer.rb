class BandSerializer < ActiveModel::Serializer
  attributes :id, :name

  belongs_to :user
  belongs_to :concert_ticket
end

