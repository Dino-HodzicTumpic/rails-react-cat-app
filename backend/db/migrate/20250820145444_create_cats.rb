class CreateCats < ActiveRecord::Migration[7.2]
  def change
    create_table :cats do |t|
      t.string :cat_api_id, null: false, index: { unique: true }
      t.string :image_key
      t.string :image_url

      t.timestamps
    end
  end
end
