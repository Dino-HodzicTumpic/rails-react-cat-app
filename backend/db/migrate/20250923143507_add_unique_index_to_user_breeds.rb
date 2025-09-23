class AddUniqueIndexToUserBreeds < ActiveRecord::Migration[7.2]
  def change
     add_index :user_breeds, [:user_id, :breed_id], unique: true
  end
end
