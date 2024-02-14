import { useState, useEffect } from 'react';
import { API_KEY } from '../Config';

function RecentMatches({ puuid }: RecentMatchesProps) {
    const [recentMatches, setRecentMatches] = useState<string[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    // When a puuid is provided, fetch the 10 most recent matches
    useEffect(() => {
        const fetchAccountData = async () => {
            try {
                const response = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${API_KEY}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch latest matches. Response code: ${response.status}`);
                }
                const data = await response.json();
                setRecentMatches(data);
                setError(null);
            } catch (error) {
                setRecentMatches(null);
                setError((error as Error).message);
            }
        };

        if (puuid) {
            fetchAccountData();
        }
    }, [puuid]);

    return (
        <div>
            {/*Error display*/}
            {error && <p>
                An error happened. Please try again later.<br />
                Error code: {error}
            </p>}

            {/* Normal display */}
            {(puuid && !error) && (
                <div>
                    {recentMatches ? ( // Succes display
                        <>
                            {recentMatches} //TODO: Display the match global infos
                        </>
                    ) : ( // Loading display
                        <p>Loading...</p>
                    )}
                </div>
            )}

        </div>
    );
}
interface RecentMatchesProps {
    puuid: string
}

export default RecentMatches;