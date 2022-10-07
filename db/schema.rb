ActiveRecord::Schema[7.0].define(version: 2022_10_06_193706) do
  create_table "favorites", force: :cascade do |t|
    t.string "name"
    t.string "title"
    t.integer "user_id"
    t.integer "note_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notes", force: :cascade do |t|
    t.string "name"
    t.string "content"
    t.integer "user_id"
    t.integer "favorite_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
