class BandSerializer < ActiveModel::Serializer
  attributes :id, :name

  # belongs_to :user, serializer: UserSerializer
  # belongs_to :concert_ticket
  belongs_to :user
  belongs_to :concert_ticket
end

 

  # This will control the 'band' JSON response
  # TODO: You need to figure out what you need to pass the response
  # I don't need the user and the concertTicket --> Look into filtering this on the serializer level

  # Most likely: I have to remove the 'user_id' and 'concertTicket_id' from the response
  # attributes :id, :name

  # Previously this was present
  # I don't need to actually show this on the frontend:
  # belongs_to :user
  # belongs_to :concertTicket
# end
