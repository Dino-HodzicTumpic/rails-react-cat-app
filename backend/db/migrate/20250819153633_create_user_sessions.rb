class CreateUserSessions < ActiveRecord::Migration[7.2]
  def change
    create_table :user_sessions do |t|
      t.string :token, null: false, index: { unique: true }
      t.string :device, null: false
      t.datetime :expires_at, index: true
      t.datetime :last_used_at
      t.belongs_to :user, index: true, foreign_key: true

      t.timestamps
    end
  end
end
