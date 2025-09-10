class AddCloudinaryPublicIdToCats < ActiveRecord::Migration[7.2]
  def change
    add_column :cats, :cloudinary_public_id, :string, null: false
  end
end
