class CreateConcertTickets < ActiveRecord::Migration[6.1]
  def change
    create_table :concert_tickets do |t|
      t.string :title
      t.timestamps
    end
  end
end
