class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users do |t|
      t.string :sub_id, null: false, index: { unique: true }
      t.string :google_id, index: { unique: true }
      t.string :email, index: { unique: true }, null: false
      t.string :nickname, null: false
      t.string :avatar_key
      t.string :avatar_url
      t.integer :view_history, array: true, default: []
      t.string :confirmation_token, index: { unique: true }
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at
      t.string :password_digest

      t.timestamps
    end
  end
end
