import axios from "axios";

export const fetchNBASchedule = async (date) => {

    const apiKey = process.env.REACT_APP_NBA_API_KEY;
    const apiHost = process.env.REACT_APP_NBA_API_HOST;

    const apiUrl = `https://api-nba-v1.p.rapidapi.com/games?date=${date}`;
    const options = {
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost
        }
    };

    try {
        const response = await axios.get(apiUrl, options);
        console.log(response.data); 
    } catch (error) {
        console.error('Error fetching schedule:', error);
        throw error;
    }
};

// Fetches and returns player data from respective team and season
export const fetchPlayerData = async (homeTeamId, awayTeamId, season) => {
    const apiKey = env.REACT_APP_NBA_API_KEY;
    const apiHost = env.REACT_APP_NBA_API_HOST;
    
    const homeTeamUrl = `https://api-nba-v1.p.rapidapi.com/players?team=${homeTeamId}&season=${season}`;
    const awayTeamUrl = `https://api-nba-v1.p.rapidapi.com/players?team=${awayTeamId}&season=${season}`;
    const options = {
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost
        }
    };

    try {
        const [homeTeamResponse, awayTeamResponse] = await Promise.all([
            axios.get(homeTeamUrl, options),
            axios.get(awayTeamUrl, options)
        ]);

        console.log('Home Team Data:', homeTeamResponse.data);
        console.log('Away Team Data:', awayTeamResponse.data);

        return {
            homeTeamData: homeTeamResponse.data.response,
            awayTeamData: awayTeamResponse.data.response
        };

    } catch (error) {
        console.error('Error fetching player data:', error);
        throw error;
    }
}