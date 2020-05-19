class CreateTopics < ActiveRecord::Migration[6.0]
  def change
    create_table :topics do |t|
      t.string :subject
      t.string :board
      t.string :createdBy

      t.timestamps
    end
  end
end
