class AddAvatarPublicIdToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :avatar_public_id, :string
  end
end
