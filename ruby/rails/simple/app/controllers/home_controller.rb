class HomeController < ApplicationController
  def index
    puts "home.index"
    Article.new(name: "new article").save()
    @articles = Article.all()
    puts @articles
    puts I18n.t 'hello'
    I18n.locale = :zh
    puts I18n.t 'hello'
  end
end
