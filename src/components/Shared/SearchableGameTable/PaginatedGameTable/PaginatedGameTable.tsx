import './PaginatedGameTable.css';
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Page } from "../../../../model/Page";
import { Game } from "../../../../model/Game";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import ClickableSpan from "../../ClickableSpan/ClickableSpan";

export interface PaginatedGameTableProps {
    loading: boolean,
    pageable: Page<Game>,
    getNextPage: () => void,
    getPreviousPage: () => void,
    onSelection: (game: Game) => void
}

const PaginatedGameTable = (props: PaginatedGameTableProps) => {

    const isDesktop = useMediaQuery('(min-width: 960px)');

    const getSummary = (it: Game) => {
        return <>
            <img src={it.homeTeam.logo} alt={it.homeTeam.name} width={24} height={24} />
            &nbsp;
            <img src={it.awayTeam.logo} alt={it.awayTeam.name} width={24} height={24} />
        </>
    }

    const getState = (it: Game) => {
        switch (it.state) {
            case 'NOT_STARTED':
                return "No iniciado";
            case 'IN_PROGRESS':
                return "En juego";
            case 'PENDING_RESULT':
                return "Finalizado (?)"
            case 'DONE':
                return "Finalizado (" + getResult(it) + ")";
            default:
                return "";
        }
    }

    const getResult = (it: Game) => {
        switch (it.result) {
            case 'HOME_TEAM_WON':
                return "L";
            case 'AWAY_TEAM_WON':
                return "V";
            case 'DRAW':
                return "E";
            default:
                return "";
        }
    }

    const actions = (it: Game) => {
        return <>
            <button onClick={() => props.onSelection(it)} className="btn-small"><FontAwesomeIcon icon="magnifying-glass-plus" /></button>
        </>;
    }

    return (
        <>
            <div id={isDesktop ? "paginated-game-table-container" : "paginated-game-table-container-mobile"} className="basic-table-container">
                <table>
                    <thead>
                        <tr>
                            <th className="text-center"><FontAwesomeIcon icon="trophy" /></th>
                            <th className="text-center"><FontAwesomeIcon icon="gamepad" /></th>
                            <th className="text-center"><FontAwesomeIcon icon="calendar" /></th>
                            <th className="text-center"><FontAwesomeIcon icon="signal" /></th>
                            <th className="text-center"><FontAwesomeIcon icon="wand-magic-sparkles" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.loading ? (
                            <tr>
                                <td colSpan={5} className="text-center">
                                    <FontAwesomeIcon icon="spinner" spin />
                                </td>
                            </tr>
                        ) : (props.pageable.data.length === 0) ? (
                            <tr>
                                <td className="text-center" colSpan={5}>Sin resultados</td>
                            </tr>
                        ) : (
                            props.pageable.data.map((it, idx) =>
                                <tr key={idx}>
                                    <td className="text-center text-middle">
                                        <img src={it.competition.logo} alt={it.competition.name} width={24} height={24} />
                                    </td>
                                    <td className="text-center text-middle">{getSummary(it)}</td>
                                    <td className="text-center text-middle">{dayjs(it.date).format("DD/MM HH:mm")}</td>
                                    <td className="text-center text-middle">{getState(it)}</td>
                                    <td className="text-center text-middle">{actions(it)}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
            {<div className="flex-container">
                {props.loading || props.pageable.pages === 0 ? (
                    <>
                        <div className="full-width text-left">&nbsp;</div>
                    </>
                ) : (
                    <>
                        <div className="half-width text-left">
                            Mostrando p&aacute;gina {props.pageable.current + 1} de {props.pageable.pages} ({props.pageable.total} partidos en total).
                        </div>
                        <div className="half-width text-right">
                            {props.pageable.current > 0 &&
                                <ClickableSpan onClick={props.getPreviousPage} >
                                    <FontAwesomeIcon icon="angle-left" /> anterior
                                </ClickableSpan>}
                            &nbsp;
                            {props.pageable.current + 1 < props.pageable.pages &&
                                <ClickableSpan onClick={props.getNextPage} >
                                    siguiente <FontAwesomeIcon icon="angle-right" />
                                </ClickableSpan>}
                        </div>
                    </>
                )}
            </div>}
        </>
    )
}

export default PaginatedGameTable;