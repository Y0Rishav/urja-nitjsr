import React, { useState, useEffect } from "react";
import "./LeaderBoard.css";
import Footer from '../Footer/Footer.jsx';
// --- RAW DATA: totalPoints is now often 0 in the source, as it will be calculated ---
const teamsData = [
  {
    name: "ECM+PIE",
    totalPoints: 0, // Not Needed
    breakdown: {
      Athletics: 0,
      Badminton: 0,
      Carrom: 0,
      Chess: 0,
      Cricket: 0,
      Football: 0,
      "Lawn Tennis": 0,
      Parade: 0,
      "Table Tennis": 0,
      Volleyball: 0,
    },
  },
  {
    name: "CSE",
    totalPoints: 0,// Not Needed
    breakdown: {
      Athletics: 0,
      Badminton: 0,
      Carrom: 0,
      Chess: 7,
      Cricket: 7,
      Football: 0,
      "Lawn Tennis": 0,
      Parade: 0,
      "Table Tennis": 0,
      Volleyball: 0,
    },
  },
  {
    name: "ECE",
    totalPoints: 0, // Not Needed
    breakdown: {
      Athletics: 0,
      Badminton: 7,
      Carrom: 0,
      Chess: 5,
      Cricket: 10,
      Football: 0,
      "Lawn Tennis": 0,
      Parade: 0,
      "Table Tennis": 5,
      Volleyball: 0,
    },
  },
  {
    name: "CE",
    totalPoints: 0, // Not Needed
    breakdown: {
      Athletics: 0,
      Badminton: 0,
      Carrom: 0,
      Chess: 0,
      Cricket: 0,
      Football: 0,
      "Lawn Tennis": 0,
      Parade: 0,
      "Table Tennis": 0,
      Volleyball: 0,
    },
  },
  {
    name: "MME",
    totalPoints: 0, // Not Needed
    breakdown: {
      Athletics: 0,
      Badminton: 0,
      Carrom: 0,
      Chess: 5,
      Cricket: 5,
      Football: 0,
      "Lawn Tennis": 0,
      Parade: 0,
      "Table Tennis": 5,
      Volleyball: 0,
    },
  },
  {
    name: "ME",
    totalPoints: 0, // Not Needed
    breakdown: {
      Athletics: 0,
      Badminton: 5,
      Carrom: 0,
      Chess: 3.5,
      Cricket: 0,
      Football: 0,
      "Lawn Tennis": 0,
      Parade: 0,
      "Table Tennis": 3.5,
      Volleyball: 0,
    },
  },
  {
    name: "EE",
    totalPoints: 0, // Not Needed
    breakdown: {
      Athletics: 0,
      Badminton: 10,
      Carrom: 0,
      Chess: 10,
      Cricket: 0,
      Football: 0,
      "Lawn Tennis": 0,
      Parade: 0,
      "Table Tennis": 0,
      Volleyball: 0,
    },
  },
  {
    name: "PG",
    totalPoints: 0, // Not Needed
    breakdown: {
      Athletics: 0,
      Badminton: 0,
      Carrom: 0,
      Chess: 8.5,
      Cricket: 0,
      Football: 0,
      "Lawn Tennis": 0,
      Parade: 0,
      "Table Tennis": 3.5,
      Volleyball: 0,
    },
  },
];

// --- NEW FUNCTION TO CALCULATE TOTAL POINTS ---
const calculateTotalPoints = (data) => {
  return data.map(team => {
    // Calculate the sum of all points in the breakdown object
    const calculatedTotalPoints = Object.values(team.breakdown).reduce(
      (sum, points) => sum + points,
      0
    );
    // Return a new team object with the calculated totalPoints
    return {
      ...team,
      totalPoints: calculatedTotalPoints,
    };
  });
};

const LeaderBoard = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  // 1. Calculate the totals first
  const teamsWithCalculatedTotals = calculateTotalPoints(teamsData);

  // 2. Sort the calculated totals
  const sortedTeams = [...teamsWithCalculatedTotals].sort(
    (a, b) => b.totalPoints - a.totalPoints
  );

  // Existing logic for podium and list separation
  const topThree = sortedTeams.slice(0, 3);
  const teamsBelowPodium = sortedTeams.slice(3);

  const podiumOrder = [topThree[1], topThree[0], topThree[2]].filter(Boolean);

  const handleTeamClick = (team) => setSelectedTeam(team);
  const closeModal = () => setSelectedTeam(null);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const getPodiumClasses = (index) => {
    if (index === 1) return "podium-item first-place";
    if (index === 0) return "podium-item second-place";
    if (index === 2) return "podium-item third-place";
    return "podium-item";
  };

  const getMedalEmoji = (index) => {
    if (index === 1) return "🏆";
    if (index === 0) return "🥈";
    if (index === 2) return "🥉";
    return "";
  };

  const getTextColorClass = (index) => {
    if (index === 1) return "first-place-text";
    if (index === 0) return "second-place-text";
    if (index === 2) return "third-place-text";
    return "";
  };

  // Check if any of the top 3 teams have nonzero points
  const showPodium = topThree.some((team) => team.totalPoints > 0);

  return (
    <>
      <div className="leaderboard-page">
        {selectedTeam && (
          <>
            <div className="modal-overlay" onClick={closeModal}></div>
            <div className="breakdown-section">
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
              <div className="breakdown-title">{selectedTeam.name}</div>
              <div className="breakdown-grid">
                {Object.entries(selectedTeam.breakdown).map(([sport, points]) => (
                  <div
                    key={sport}
                    className={`breakdown-item ${points === 0 ? "zero-points" : ""
                      }`}
                  >
                    <span className="breakdown-sport">{sport}</span>
                    <span className="breakdown-points">{points}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="leaderboard-container">
          <div className="title-section">
            <div className="main-title">LEADERBOARD</div>
            <div className="subtitle">URJA'26 • SPORTSFEST 2025</div>
          </div>

          {/* Only show podium if any top 3 team has nonzero points */}
          {showPodium && (
            <div className="podium">
              {podiumOrder.map((team, index) => (
                <div key={team.name} className="podium-column">
                  <div className="podium-team">
                    <div
                      className={`podium-team-name ${getTextColorClass(index)}`}
                    >
                      {team.name}
                    </div>
                    <div
                      className={`podium-team-points ${getTextColorClass(index)}`}
                    >
                      {team.totalPoints}
                    </div>
                    <button
                      className="details-button"
                      onClick={() => handleTeamClick(team)}
                    >
                      Details
                    </button>
                    <div className={getPodiumClasses(index)}>
                      <div className="podium-trophy">{getMedalEmoji(index)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="other-teams-section">
            <div className="other-teams-list">
              {teamsBelowPodium.map((team, index) => (
                <div key={team.name} className="list-item-wrapper">
                  <div className="list-item">
                    <div className="list-rank">{index + 4}</div>
                    <div className="list-name">{team.name}</div>
                    <div className="list-points">{team.totalPoints}</div>
                    <button
                      className="details-button"
                      onClick={() => handleTeamClick(team)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="scoring-rules">
            <div className="scoring-title">SCORING SYSTEM</div>
            <div>
              1st Place: 10 points • 2nd Place: 7 points • 3rd Place: 5 points
            </div>
            <div className="scoring-subtitle">
              Team trophies awarded based on total points from all events
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );

};

export default LeaderBoard;