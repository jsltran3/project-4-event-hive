class AlterBandsColumn < ActiveRecord::Migration[6.1]
  def change
    change_column :bands, :band_id, :integer, null: false
    change_column :bands, :user_id, :integer, null: false
  end
end


# t.integer "band_id"
# t.integer "user_id"