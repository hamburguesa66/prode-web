import './FeaturedGamePanel.css';

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Game } from "../../../../model/Game";
import { Bet } from "../../../../model/Bet";
import useAxios from "../../../../hooks/useAxios";
import { Page } from "../../../../model/Page";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import GameCard from "../GameCard/GameCard";

export interface FeaturedGamePanelProps {
    title: string;
    icon: IconProp;
    sortOrder: string;
    state: string;
}

const FeaturedGamePanel = (props: FeaturedGamePanelProps) => {

    const [games, setGames] = useState<Page<Game>>();
    const [bets, setBets] = useState<Bet[]>([]);

    const { response: gResponse, loading: gLoading, error: gError } = useAxios({
        lazy: false,
        method: "GET",
        url: `/game/list?page=0&size=10&sortOrder=${props.sortOrder}&state=${props.state}`,
        data: undefined
    });

    useEffect(() => {
        if (gResponse?.data) {
            setGames(gResponse.data as Page<Game>);
        }
    }, [gResponse]);

    const { response: bResponse, loading: bLoading, error: bError, sendData: getBets } = useAxios({
        lazy: true,
        method: "GET",
        url: `/bet/list?gameIds=${games?.data.map(it => it.id).join(",")}`,
        data: undefined
    });

    useEffect(() => {
        if (games?.data) {
            getBets();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [games]);

    useEffect(() => {
        if (bResponse?.data) {
            setBets(bResponse.data as Bet[]);
        }
    }, [bResponse]);

    const loading = gLoading || bLoading || !bResponse?.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const error = gError || bError;

    const onBetChange = (_game: Game, bet: Bet) => {
        setBets(
            bets.map(it => {
                if (it.id === bet.id) {
                    return bet;
                }
                return it;
            })
        );
    };

    return (
        <>
            <h3>
                <FontAwesomeIcon icon={props.icon} /> {props.title}
            </h3>
            
            {loading || error ? (
                <>
                    <div className="featured-panel-container-skeleton">
                        <FontAwesomeIcon icon="spinner" spin />
                    </div>
                </>
            ) : (games?.data.length === 0) ? (
                <>
                    <div className="featured-panel-container-skeleton">
                        No hay partidos disponibles en este momento
                    </div>
                </>
            ) : (
                <>
                    <div className="featured-panel-container">
                        {games?.data.map(g => <div key={g.id} className="featured-panel-item-wrapper">
                            <GameCard
                                game={g}
                                bet={bets.find(b => b.gameId === g.id)}
                                onBetChange={onBetChange} />
                        </div>)}
                    </div>
                </>
            )}
        </>
    )
}

export default FeaturedGamePanel;