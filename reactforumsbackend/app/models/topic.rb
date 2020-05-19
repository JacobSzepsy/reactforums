class Topic < ApplicationRecord
	validates :subject, presence: true
	validates :createdBy, presence: true
	validates :board, presence: true
end
