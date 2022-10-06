class Note < ApplicationRecord
    belongs_to :user
    has_many :favorites, through: :user
end
