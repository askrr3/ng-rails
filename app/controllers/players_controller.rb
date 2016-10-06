class PlayersController < ApplicationController
  def index
    render :json => Player.all
    puts '==' *1000
    puts Player.all
  end
end
