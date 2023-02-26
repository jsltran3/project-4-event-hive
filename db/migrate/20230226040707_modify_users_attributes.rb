class ModifyUsersAttributes < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :user_name, :string
    add_column :users, :username, :string
  end
end
