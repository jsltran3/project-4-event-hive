class RemoveConcertAttributes < ActiveRecord::Migration[6.1]
  def change
    remove_column :concert_tickets, :band_id, :integer
    remove_column :concert_tickets, :user_id, :integer

  end
end
