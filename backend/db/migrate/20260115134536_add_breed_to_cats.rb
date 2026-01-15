class AddBreedToCats < ActiveRecord::Migration[7.2]
  def change
    add_reference :cats, :breed, null: false, foreign_key: true
  end
end
