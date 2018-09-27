class Api::CatsController < ApplicationController
  before_action :authenticate_user!

  def my_cats
    render json: User.liked(current_user.liked_cats)
  end

  def index
    render json: User.random_cats(current_user.liked_cats)
  end

  def update
    current_user.liked_cats << params[:id].to_i
    current_user.save
  end
end
