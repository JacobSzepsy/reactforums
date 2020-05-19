class Post < ApplicationRecord
	validates :thread, presence: true
	validates :user, presence: true
	validates :body, presence: true
end
