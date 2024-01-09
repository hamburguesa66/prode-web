import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import GameCard from "../components/Shared/GameCard";

export interface Team {
    id: number,
    name: string,
    logo: string
}

export interface Competition {
    id: number,
    name: string,
    hashtag: string,
    logo: string
}

export interface Game {
    id: number,
    homeTeam: Team,
    awayTeam: Team,
    competition: Competition,
    date: Date,
    state: string,
    result: string | undefined,
    homeTeamScore: number | undefined,
    awayTeamScore: number | undefined
}

export interface Bet {
    id: number,
    userUuid: string | undefined,
    gameId: number,
    result: string,
    date: Date
}

export interface GameWithBet {
    game: Game,
    bet: Bet | undefined;
}

const Home = () => {
    const { principal } = useUserContext();

    const [games, setGames] = useState<GameWithBet[]>([]);

    const { response } = useAxios({
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
                    {games.map(it => <GameCard game={it.game} bet={it.bet} />)}
                </>
            )}
        </>
    )
}

export default Home;