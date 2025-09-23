class ChangeCloudinaryPublicIdNullInCats < ActiveRecord::Migration[7.2]
  def change
      change_column_null :cats, :cloudinary_public_id, true
  end
end
