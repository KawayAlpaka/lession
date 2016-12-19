class HomeController < ApplicationController
  def index
    puts "home.index"
    Article.new(name: "new article").save()
    @articles = Article.all()
    puts @articles
  end
end
