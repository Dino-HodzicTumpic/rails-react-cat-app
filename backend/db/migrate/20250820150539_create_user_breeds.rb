class CreateUserBreeds < ActiveRecord::Migration[7.2]
  def change
    create_table :user_breeds do |t|
      t.references :user, null: false, index: true, foreign_key: true
      t.references :breed, null: false, index: true, foreign_key: true

      t.timestamps
    end
  end
end
