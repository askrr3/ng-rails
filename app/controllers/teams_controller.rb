class PlayersController < ApplicationController
  def index
    render :json => Team.all
  end

  puts '==' *1000
  puts Team.all
end
