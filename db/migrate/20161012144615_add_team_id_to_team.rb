class AddTeamIdToTeam < ActiveRecord::Migration
  def change
    add_reference :teams, :team_id, index: true
  end
end
