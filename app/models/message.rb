class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :content, presence: true, unless: :image?
  # imageが無い時に空の値をはじく
end
