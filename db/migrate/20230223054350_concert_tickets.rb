class ConcertTickets < ActiveRecord::Migration[6.1]
  def change
    create_table :concert_tickets do |t|
      t.string :name
      t.timestamps
    end
  end
end
