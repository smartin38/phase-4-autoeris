class CreateFavorites < ActiveRecord::Migration[7.0]
  def change
    create_table :favorites do |t|
      t.string :name
      t.string :title
      t.integer :user_id
      t.integer :note_id

      t.timestamps
    end
  end
end
