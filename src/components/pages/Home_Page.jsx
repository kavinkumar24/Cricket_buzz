import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import team1 from '../assests/TEAM1.jpeg';
import team2 from '../assests/TEAM2.jpeg';

function Home_Page() {
    const [matchesData, setMatchesData] = useState([]);
    const [teamsData, setTeamsData] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const matchResponse = await fetch('http://localhost:8001/match');
                // const teamResponse = await fetch('http://localhost:8001/teams');

                if (matchResponse.ok) {
                    const matchData = await matchResponse.json();
                    // const teamData = await teamResponse.json();
                    setMatchesData(matchData.teams);
                    // setTeamsData(teamData.teams);
                } else {
                    console.error('Failed to fetch initial data');
                }
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };

        fetchInitialData();

        const ws = new WebSocket('ws://localhost:8001');
        ws.onopen = () => console.log('WebSocket connection established');
        ws.onmessage = (event) => {
            const updatedData = JSON.parse(event.data);
            if (updatedData.matches) setMatchesData(updatedData.matches);
        };
        ws.onclose = () => console.log('WebSocket connection closed');
        ws.onerror = (error) => console.error('WebSocket error:', error);

        return () => ws.close();
    }, []);

    const calculateScoreAndWickets = (players) => {
        let totalRuns = 0;
        let totalWickets = 0;
        players.forEach(player => {
            totalRuns += player.runs;
            if (player.balls > 0 && player.runs === 0) {
                totalWickets += 1;
            }
        });
        return { totalRuns, totalWickets };
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-lg mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                <div className="h-12 bg-[#D9D9D9]">
                    <h2 className="text-2xl font-bold mb-4 text-center">IPL Score Board</h2>
                </div>
                <div className="grid grid-cols-2 gap-[50%] w-full">
                    <h2 className="text-md text-nowrap">Indian Premier League, 2024</h2>
                    <h2 className="text-sm">May 21</h2>
                </div>
                <div className="flex justify-between">
                    {matchesData.map((team, index) => {
                        const { totalRuns, totalWickets } = calculateScoreAndWickets(team.players);
                        return (
                            <div key={team._id} className="flex flex-col items-center">
                                <img src={index === 0 ? team1 : team2} alt={`${team.teamName} Logo`} className="w-20 h-20 mb-2" />
                                <div className="text-center">
                                    <p className="font-bold">{team.teamName}</p>
                                    <p className="font-bold">{`Score: ${totalRuns}/${totalWickets}`}</p>
                                    {team.players.map((player, i) => (
                                        <p key={i} className="text-sm">{`${player.name}: ${player.runs}(${player.balls})`}</p>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-10">
                    <h2 className="text-xl font-bold mb-4 text-center">Teams</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {teamsData.map((team) => (
                            <div key={team._id} className="card">
                                <h3 className="text-center font-bold">{team.team_name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home_Page;
