class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

    # ERD Entity Relationship Diagram For Project:
  # - User:
  # + has_many :bands
  # + has_many :concert
  # + through: :bands
  # - Concert:
  # + has_many :bands
  # + has_many :users, through: :bands
  # + has_one :location
  # - Bands:
  # + belongs_to :user
  # + belongs_to :concert
  # - Location:
  # + belongs_to: :concert
end
