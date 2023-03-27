
User.delete_all()
ConcertTicket.delete_all()
Band.delete_all()


joe = User.create(username: "test", password: "test")
