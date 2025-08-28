class RemoveAvatarKeyFromUsers < ActiveRecord::Migration[7.2]
  def change
    remove_column :users, :avatar_key, :string
  end
end
