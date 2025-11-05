// src/components/PointsTable/sports/basketball/boys/knockout.js

export const tableTennisBoysKnockout = {
    rounds: [
        {
            name: "Semi-finals",
            matches: [
                { id: "SF1", team1: "ECE", team2: "EE", winner: "", score1: "", score2: "" },
                { id: "SF2", team1: "CSE", team2: "PG", winner: "", score1: "", score2: "" },
                { id: 'SF1', date: '13 December', venue: 'TSG', team1: 'PIE+ECM', score1: '', team2: 'MME', score2: '', winner: '' },
                { id: 'SF2', date: '14 December', venue: 'TSG', team1: 'CSE', score1: '', team2: 'ECE', score2: '', winner: '' },
            ]
        },
        {
            name: "Final",
            matches: [
                { id: 'F1', date: 'TBD', venue: 'TSG', team1: 'Winner SF1', score1: '', score1_pen: '', team2: 'Winner SF2', score2: '', score2_pen: '', winner: '' }
            ]
        }
    ],
    // 💡 NEW: Dedicated thirdPlace object
    thirdPlace: {
        name: "Third Place",
        match: {
            id: 'TP1', date: 'TBD', venue: 'TSG', team1: 'Loser SF1', score1: '', team2: 'Loser SF2', score2: '', winner: ''
        }
    }
};