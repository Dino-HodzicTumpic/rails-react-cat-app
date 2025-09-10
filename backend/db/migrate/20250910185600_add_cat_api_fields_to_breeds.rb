class AddCatApiFieldsToBreeds < ActiveRecord::Migration[7.2]
  def change
    add_column :breeds, :cat_api_id, :string
    add_column :breeds, :temperament, :string
    add_column :breeds, :origin, :string
    add_column :breeds, :life_span, :string
    add_column :breeds, :sample_image_url, :string
    add_column :breeds, :featured, :boolean, default: false
    add_column :breeds, :wikipedia_url, :string
    
    add_index :breeds, :cat_api_id, unique: true
    add_index :breeds, :featured
  end
end
