import './PaginatedChallengeTable.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Page } from '../../../model/Page';
import { Challenge } from '../../../model/Challenge';
import useMediaQuery from '../../../hooks/useMediaQuery';
import ClickableSpan from '../ClickableSpan/ClickableSpan';

export interface PaginatedChallengeTableProps {
    loading: boolean,
    pageable: Page<Challenge>,
    getNextPage: () => void,
    getPreviousPage: () => void,
    onSelection: (challenge: Challenge) => void
}

const PaginatedChallengeTable = (props: PaginatedChallengeTableProps) => {

    const isDesktop = useMediaQuery('(min-width: 960px)');

    const status = (it: Challenge) => {
        switch (it.state) {
            case 'CREATED':
                return "No iniciado";
            case 'IN_PROGRESS':
                return "En curso";
            case 'ENDED':
                return "Finalizado (?)"
            case 'CLOSED_WITHOUT_WINNER':
                return "Finalizado (E)";
            case 'CLOSED_WITH_WINNER':
                return "Finalizado (G)";
            default:
                return "";
        }
    }

    const actions = (it: Challenge) => {
        return <>
            <button onClick={() => props.onSelection(it)} className="btn-small"><FontAwesomeIcon icon="magnifying-glass-plus" /></button>
        </>;
    }

    return (
        <>
            <div id={isDesktop ? "paginated-challenge-table-container" : "paginated-challenge-table-container-mobile"} className="basic-table-container">
                <table>
                    <thead>
                        <tr>
                            <th className="text-center"><FontAwesomeIcon icon="signature" /></th>
                            <th className="text-center"><FontAwesomeIcon icon="signal" /></th>
                            <th className="text-center"><FontAwesomeIcon icon="wand-magic-sparkles" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.loading ? (
                            <tr>
                                <td colSpan={3} className="text-center">
                                    <FontAwesomeIcon icon="spinner" spin />
                                </td>
                            </tr>
                        ) : (props.pageable.data.length === 0) ? (
                            <tr>
                                <td className="text-center" colSpan={3}>Sin resultados</td>
                            </tr>
                        ) : (
                            props.pageable.data.map((it, idx) =>
                                <tr key={idx}>
                                    <td className="text-center text-middle">{it.name}</td>
                                    <td className="text-center text-middle">{status(it)}</td>
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
                            Mostrando p&aacute;gina {props.pageable.current + 1} de {props.pageable.pages} ({props.pageable.total} desaf&iacute;os en total).
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

export default PaginatedChallengeTable;