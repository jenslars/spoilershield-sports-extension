// Save game data in localStorage
export const saveGameData = (sport, gameData) => {
  const {
    id,
    gameDetails: {startDate, startTime }, // Destructure startDate and startTime from gameDetails
    homeTeam,
    visitorsTeam, 
  } = gameData;

  const dataToStore = {
    id,
    gameDetails: {
      sport,
      startDate, 
      startTime 
    },
    homeTeam: {
      teamName: homeTeam.teamName,
      teamNickname: homeTeam.teamNickname,
      teamCode: homeTeam.teamCode,
      players: homeTeam.players.map(player => ({
        firstname: player.firstname,
        lastname: player.lastname
      })),
    },
    visitorsTeam: {
      teamName: visitorsTeam.teamName,
      teamNickname: visitorsTeam.teamNickname,
      teamCode: visitorsTeam.teamCode,
      players: visitorsTeam.players.map(player => ({
        firstname: player.firstname,
        lastname: player.lastname
      })),
    },
  };

  localStorage.setItem(`eventData_${id}`, JSON.stringify(dataToStore));
};

  
  // Retrieve game data from localStorage
  export const getSpoilerData = (gameId) => {
    const data = localStorage.getItem(`eventData_${gameId}`);
    return data ? JSON.parse(data) : null;
  };
  
  export const getBlockedEventDetails = () => {
    const games = [];
    const prefix = 'eventData_'; // Assuming all games are stored with this prefix
  
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(prefix)) {
        const data = localStorage.getItem(key);
        if (data) {
          const parsedData = JSON.parse(data); // Parse the JSON string
          const gameDetails = {
            sport: parsedData.gameDetails.sport,
            id: parsedData.id,
            startDate: parsedData.gameDetails.startDate,
            startTime: parsedData.gameDetails.startTime,
            homeTeamName: parsedData.homeTeam.teamName,
            visitorsTeamName: parsedData.visitorsTeam.teamName,
          };
          games.push(gameDetails); // Add to the games array
        }
      }
    }
    
    console.log(games);
    return games; // Return all the blocked games
  };
  
  export const removeBlockedEvent = (eventId) => {
    localStorage.removeItem(`eventData_${eventId}`);
  }