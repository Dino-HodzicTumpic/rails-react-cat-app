# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_09_10_185600) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "breeds", force: :cascade do |t|
    t.string "breed_name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.string "cat_api_id"
    t.string "temperament"
    t.string "origin"
    t.string "life_span"
    t.string "sample_image_url"
    t.boolean "featured", default: false
    t.string "wikipedia_url"
    t.index ["breed_name"], name: "index_breeds_on_breed_name", unique: true
    t.index ["cat_api_id"], name: "index_breeds_on_cat_api_id", unique: true
    t.index ["featured"], name: "index_breeds_on_featured"
  end

  create_table "cats", force: :cascade do |t|
    t.string "cat_api_id", null: false
    t.string "image_key"
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "cloudinary_public_id", null: false
    t.index ["cat_api_id"], name: "index_cats_on_cat_api_id", unique: true
  end

  create_table "user_breeds", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "breed_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["breed_id"], name: "index_user_breeds_on_breed_id"
    t.index ["user_id"], name: "index_user_breeds_on_user_id"
  end

  create_table "user_sessions", force: :cascade do |t|
    t.string "token", null: false
    t.string "device", null: false
    t.datetime "expires_at"
    t.datetime "last_used_at"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["expires_at"], name: "index_user_sessions_on_expires_at"
    t.index ["token"], name: "index_user_sessions_on_token", unique: true
    t.index ["user_id"], name: "index_user_sessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "sub_id", null: false
    t.string "google_id"
    t.string "email", null: false
    t.string "nickname", null: false
    t.string "avatar_url"
    t.integer "view_history", default: [], array: true
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "avatar_public_id"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["google_id"], name: "index_users_on_google_id", unique: true
    t.index ["sub_id"], name: "index_users_on_sub_id", unique: true
  end

  add_foreign_key "user_breeds", "breeds"
  add_foreign_key "user_breeds", "users"
  add_foreign_key "user_sessions", "users"
end
