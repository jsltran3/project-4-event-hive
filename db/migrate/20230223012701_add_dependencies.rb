class AddDependencies < ActiveRecord::Migration[6.1]
  def change
    add_column :bands, :user_id, :integer 
    add_column :bands, :concert_ticket

  end
end
