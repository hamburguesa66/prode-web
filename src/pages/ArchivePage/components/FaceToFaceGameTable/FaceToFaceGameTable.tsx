import './FaceToFaceGameTable.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Game } from '../../../../model/Game';
import { User } from '../../../../model/User';
import { Bet } from '../../../../model/Bet';
import dayjs from 'dayjs';


interface FaceToFaceGameTableProps {
    loading: boolean;
    games: Game[] | undefined;
    userA: User | undefined;
    userABets: Bet[] | undefined;
    userB: User | undefined;
    userBBets: Bet[] | undefined;
}

const FaceToFaceGameTable = (props: FaceToFaceGameTableProps) => {

    const header = (it: Game) => {
        return <div className="face-to-face-table-th">
            <img src={it.competition.logo} alt={it.competition.name} width={24} height={24} />
            &nbsp;
            <FontAwesomeIcon icon="x" size="xs" />
            &nbsp;
            <img src={it.homeTeam.logo} alt={it.homeTeam.name} width={24} height={24} />
            &nbsp;
            <img src={it.awayTeam.logo} alt={it.awayTeam.name} width={24} height={24} />
            <br />
            {dayjs(it.date).format("DD/MM HH:mm")}
        </div>;
    }

    const userBetsRow = (game: Game, bets: Bet[]) => {
        const bet = bets.filter(bet => bet.gameId === game.id)[0];

        if (!bet) {
            return <FontAwesomeIcon icon="minus" />;
        }

        if (bet.gameResult === game.result) {
            return <FontAwesomeIcon icon="square-check" color="#237804" />;
        }

        return <FontAwesomeIcon icon="circle-xmark" color="#a8071a" />;
    }

    return (
        <>
            <div className="face-to-face-table-container" >
                {props.loading ? (
                    <p className="face-to-face-table-placeholder-p">
                        <FontAwesomeIcon icon="spinner" spin /> Cargando datos ...
                    </p>
                ) : (props.games?.length || 0) === 0 ? (
                    <p className="face-to-face-table-placeholder-p">
                        Sin resultados
                    </p>
                ) : (
                    <table>
                        <tbody>
                            <tr>
                                <td className="text-center">
                                    <FontAwesomeIcon icon="user-tie" /> / <FontAwesomeIcon icon="gamepad" />
                                </td>
                                {props.games?.map(it => <td className="text-center">{header(it)}</td>)}
                            </tr>
                            <tr className="face-to-face-table-tr-1">
                                <td className="text-center">{props.userA?.name}</td>
                                {props.games?.map(it => <td className="text-center">{userBetsRow(it, props.userABets || [])}</td>)}
                            </tr>
                            <tr className="face-to-face-table-tr-2">
                                <td className="text-center">{props.userB?.name}</td>
                                {props.games?.map(it => <td className="text-center">{userBetsRow(it, props.userBBets || [])}</td>)}
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}

export default FaceToFaceGameTable;