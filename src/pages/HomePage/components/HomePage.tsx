import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { GameWithBet } from "../../../model/GameWithBet";
import { useUserContext } from "../../../context/UserContext";
import GameCard from "./GameCard";

const HomePage = () => {
    const { principal } = useUserContext();

    const [games, setGames] = useState<GameWithBet[]>([]);

    const { response, loading } = useAxios({
        lazy: false,
        method: "GET",
        url: `/my`,
        data: undefined
    });

    useEffect(() => {
        if (response?.data) {
            setGames(response.data as GameWithBet[]);
        }
    }, [response]);

    return (
        <>
            {!principal.isAuthenticated ? (
                <Navigate to="/" replace={true} />
            ) : (
                <>
                    <h2>🏠 Home</h2>
                    <h3>&Uacute;ltimos partidos</h3>
                    {loading ? (
                        <>
                            <pre>
                                <code><i className="spin">⌛</i> Cargando partidos ...</code>
                            </pre>
                        </>
                    ) : (
                        <>
                            {games.map(it => <GameCard game={it.game} bet={it.bet} />)}
                        </>
                    )}

                </>
            )}
        </>
    )
}

export default HomePage;