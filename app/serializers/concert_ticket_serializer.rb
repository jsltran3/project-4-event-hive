class ConcertTicketSerializer < ActiveModel::Serializer
  attributes :id, :title, :band_id, :user_id
end
