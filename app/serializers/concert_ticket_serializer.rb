class ConcertTicketSerializer < ActiveModel::Serializer
  attributes :id, :title, :band_id, :user_id
end

attributes :id, :name, :start_time, :end_time

has_many :foods
has_many :users, through: :foods
end
