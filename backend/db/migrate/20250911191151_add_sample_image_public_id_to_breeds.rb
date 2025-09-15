class AddSampleImagePublicIdToBreeds < ActiveRecord::Migration[7.2]
  def change
    add_column :breeds, :sample_image_public_id, :string
  end
end
