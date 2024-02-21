import { useParams } from "react-router-dom";


/**
 * Shows informations on a match
 */
function Match() {
    const { matchid } = useParams();

    return (
        <div>
            Match id: {matchid}
            W.I.P.
        </div>
    );
}

export default Match;