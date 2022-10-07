class CreateNotes < ActiveRecord::Migration[7.0]
  def change
    create_table :notes do |t|
      t.string :name
      t.string :content
      t.integer :user_id
      t.integer :favorite_id

      t.timestamps
    end
  end
end
