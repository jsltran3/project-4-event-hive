class CreateConcertTickets < ActiveRecord::Migration[6.1]
  def change
    create_table :concert_tickets do |t|
      t.string :title
      t.integer :band_id
      t.integer :user_id

      t.timestamps
    end
  end
end
