class Favorite < ApplicationRecord
    belongs_to :user
    has_many :notes, through: :user
end
