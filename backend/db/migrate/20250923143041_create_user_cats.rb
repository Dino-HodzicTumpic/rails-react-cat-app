class CreateUserCats < ActiveRecord::Migration[7.2]
  def change
    create_table :user_cats do |t|
      
      t.references :user, null: false, index: true, foreign_key: true
      t.references :cat, null: false, index: true, foreign_key: true

      t.timestamps

    end
    add_index :user_cats, [:user_id, :cat_id], unique: true
  end
end
