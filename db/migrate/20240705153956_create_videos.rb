class CreateVideos < ActiveRecord::Migration[7.1]
  def change
    create_table :videos, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true
      t.string :link, null: false
      t.string :title

      t.timestamps
    end
  end
end
