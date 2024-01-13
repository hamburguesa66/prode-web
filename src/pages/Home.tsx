import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import GameCard from "../components/Shared/GameCard";
import { GameWithBet } from "../model/GameWithBet";

const Home = () => {
    const { principal } = useUserContext();

    const [games, setGames] = useState<GameWithBet[]>([]);

    const { response, loading, error } = useAxios({
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
                            {error ? (
                                <>
                                    <pre>
                                        <code>❗ Oops, ha ocurrido un problema</code>
                                    </pre>I
                                </>
                            ) : (
                                <>
                                    {games.map(it => <GameCard game={it.game} bet={it.bet} />)}
                                </>
                            )}
                        </>
                    )}

                </>
            )}
        </>
    )
}

export default Home;