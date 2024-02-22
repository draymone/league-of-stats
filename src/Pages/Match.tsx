import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../Config";
import { MatchDto, MatchTimelineDto } from "../DTOs";


/**
 * Shows informations on a match
 */
function Match() {
    const { matchid } = useParams();
    const [match, setMatch] = useState<MatchDto | null>(null);
    const [matchTimeline, setMatchTimeline] = useState<MatchTimelineDto | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMatch = async () => {
            try {
                const response = await fetch(`https://euw1.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch summoner information. Response code: ${response.status}`);
                }
                const data = await response.json();
                setMatch(data);
                setError(null);
            } catch (error) {
                setMatch(null);
                setError((error as Error).message);
            }
        };

        const fetchMatchTimeline = async () => {
            try {
                const response = await fetch(`https://euw1.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline?api_key=${API_KEY}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch summoner information. Response code: ${response.status}`);
                }
                const data = await response.json();
                setMatchTimeline(data);
                setError(null);
            } catch (error) {
                setMatchTimeline(null);
                setError((error as Error).message);
            }
        };

        if (matchid) {
            fetchMatch();
            fetchMatchTimeline();
        }
    }, [matchid]);

    <div>
      {/*Error display*/}
      {error && <p>
        An error happened. Please try again later.<br />
        Error code: {error}
      </p>}

      {/* Normal display */}
      {(matchid && !error) && (
        <div>
          {match && matchTimeline ? ( // Succes display
            <>
              W.I.P.
            </>
          ) : ( // Loading display
            <p>Loading...</p>
          )}
        </div>
      )}

    </div>
}

export default Match;