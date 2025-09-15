class AddNameToCats < ActiveRecord::Migration[7.2]
  def change
    add_column :cats, :name, :string
  end
end
