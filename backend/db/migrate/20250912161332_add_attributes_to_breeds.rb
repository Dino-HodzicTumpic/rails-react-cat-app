class AddAttributesToBreeds < ActiveRecord::Migration[7.2]
  def change
    add_column :breeds, :alt_names, :string
    add_column :breeds, :adaptability, :integer
    add_column :breeds, :affection_level, :integer
    add_column :breeds, :child_friendly, :integer
    add_column :breeds, :dog_friendly, :integer
    add_column :breeds, :energy_level, :integer
    add_column :breeds, :grooming, :integer
    add_column :breeds, :health_issues, :integer
    add_column :breeds, :intelligence, :integer
    add_column :breeds, :shedding_level, :integer
    add_column :breeds, :social_needs, :integer
    add_column :breeds, :stranger_friendly, :integer
    add_column :breeds, :vocalisation, :integer
    
    # Boolean atributi
    add_column :breeds, :indoor, :boolean, default: false
    add_column :breeds, :lap, :boolean, default: false
    add_column :breeds, :experimental, :boolean, default: false
    add_column :breeds, :hairless, :boolean, default: false
    add_column :breeds, :natural, :boolean, default: false
    add_column :breeds, :rare, :boolean, default: false
    add_column :breeds, :rex, :boolean, default: false
    add_column :breeds, :suppressed_tail, :boolean, default: false
    add_column :breeds, :short_legs, :boolean, default: false
    add_column :breeds, :hypoallergenic, :boolean, default: false
  end
end
