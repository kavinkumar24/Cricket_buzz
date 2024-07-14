import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CiEdit } from 'react-icons/ci';

function Admin_home() {
  const [teams, setTeams] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({ teamIndex: null, playerIndex: null });
  const [newTeam, setNewTeam] = useState({ teamName: '', players: [{ name: '', runs: 0, balls: 0 }] });

  useEffect(() => {
    async function fetchMatchData() {
      try {
        const response = await axios.get('http://localhost:8001/match');
        setTeams(response.data.teams);
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    }

    fetchMatchData();
  }, []);

  const getLogo = (teamName) => {
    switch (teamName) {
      case 'Royal Challengers':
        return '/images/TEAM1.jpeg';
      case 'Chennai Super kings':
        return '/images/TEAM2.jpeg';
      default:
        return '/images/default-logo.png';
    }
  };

  const handleEditClick = (teamIndex, playerIndex) => {
    setEditMode(true);
    setCurrentEdit({ teamIndex, playerIndex });
  };

  const handleInputChange = (e, teamIndex, playerIndex) => {
    const { name, value } = e.target;
    const updatedTeams = [...teams];
    updatedTeams[teamIndex].players[playerIndex][name] = value;
    setTeams(updatedTeams);
  };

  const handleSaveClick = async (teamIndex, playerIndex) => {
    const updatedPlayer = teams[teamIndex].players[playerIndex];
    try {
      await axios.put('http://localhost:8001/match', {
        teamIndex,
        playerIndex,
        player: updatedPlayer,
      });
      setEditMode(false);
      setCurrentEdit({ teamIndex: null, playerIndex: null });
    } catch (error) {
      console.error('Error updating player data:', error);
    }
  };

  const handleTeamInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam({ ...newTeam, [name]: value });
    console.log(newTeam);
  };

const handleAddTeam = async () => {
  try {
    const response = await axios.post('http://localhost:8001/insert_team', {
      team_name: newTeam.teamName
    });
    if (response.data.success) {
      console.log(response.data.message); 
    } else {
      console.error('Failed to add team:', response.data.message);
    }
  } catch (error) {
    console.error('Error adding team:', error);
  }
};

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin view</h1>
      <h2 className="text-2xl font-semibold mb-2">Match Data</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-800">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Team Name</th>
              <th className="px-4 py-2">Team Logo</th>
              <th className="px-4 py-2">Players</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, teamIndex) => (
              <tr key={teamIndex} className={teamIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="border border-gray-800 px-4 py-2">{team.teamName}</td>
                <td className="border border-gray-800 px-4 py-2">
                  <img src={getLogo(team.teamName)} alt={team.teamName} className="w-12 h-12" />
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  <ul>
                    {team.players.map((player, playerIndex) => (
                      <li key={playerIndex}>
                        {editMode && currentEdit.teamIndex === teamIndex && currentEdit.playerIndex === playerIndex ? (
                          <div>
                            <input
                              type="text"
                              name="name"
                              value={player.name}
                              onChange={(e) => handleInputChange(e, teamIndex, playerIndex)}
                            />
                            <input
                              type="number"
                              name="runs"
                              value={player.runs}
                              onChange={(e) => handleInputChange(e, teamIndex, playerIndex)}
                            />
                            <input
                              type="number"
                              name="balls"
                              value={player.balls}
                              onChange={(e) => handleInputChange(e, teamIndex, playerIndex)}
                            />
                            <button onClick={() => handleSaveClick(teamIndex, playerIndex)}>Save</button>
                          </div>
                        ) : (
                          <span>
                            {player.name} - Runs: {player.runs}, Balls: {player.balls}
                            <button onClick={() => handleEditClick(teamIndex, playerIndex)}><CiEdit /></button>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">  
        <h2 className="text-2xl font-semibold mb-2">Add New Team</h2>
        <div className="flex items-center">
          <input
            type="text"
            name="teamName"
            value={newTeam.teamName}
            onChange={handleTeamInputChange}
            className="border border-gray-800 rounded-l px-2 py-1"
            placeholder="Team Name"
          />
          <button onClick={handleAddTeam} className="bg-blue-500 text-white px-4 py-1 rounded-r">Add Team</button>
        </div>
      </div>
    </div>
  );
}

export default Admin_home;
