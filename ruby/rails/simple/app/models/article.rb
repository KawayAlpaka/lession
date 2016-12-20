class Article
  include Mongoid::Document
  include Mongoid::Timestamps::Created
  field :name, type: String

  belongs_to :user

end