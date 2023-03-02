class AddIndexToBand < ActiveRecord::Migration[6.1]
  def change
    rename_column :bands, :band_id, :concert_tickets_id
    add_index :bands, :concert_tickets_id
    add_index :bands, :user_id
    
  end
end


