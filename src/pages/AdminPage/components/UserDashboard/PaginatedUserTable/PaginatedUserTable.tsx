import './PaginatedUserTable.css';

import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Page } from '../../../../../model/Page';
import { User } from '../../../../../model/User';
import useMediaQuery from '../../../../../hooks/useMediaQuery';
import ClickableSpan from '../../../../../components/Shared/ClickableSpan/ClickableSpan';
import Avatar from '../../../../../components/Shared/Avatar/Avatar';

export interface PaginatedUserTableProps {
    loading: boolean,
    pageable: Page<User>,
    getNextPage: () => void,
    getPreviousPage: () => void,
    onAction: (action: [string,User]) => void
}

const PaginatedUserTable = (props: PaginatedUserTableProps) => {

    dayjs.extend(relativeTime);
    const isDesktop = useMediaQuery('(min-width: 960px)');

    const usernameF = (user: User) => {
        if (user.isAdmin) {
            return <>{user.name} <FontAwesomeIcon icon="crown" size="xs" /></>
        }
        return user.name;
    }

    const lastLoginDateF = (user: User) => {
        if (user.lastLoginDate) {
            return dayjs(user.lastLoginDate).fromNow();
        }
        return "-";
    }

    const isActiveF = (user: User) => {
        if (!user.isApproved) {
            return <FontAwesomeIcon icon="question" />;
        }
        if (user.isActive) {
            return <FontAwesomeIcon icon="check" />;
        }
        return <FontAwesomeIcon icon="ban" />;
    }

    const actions = (user: User) => {
        const deleteBtn = <button onClick={() => props.onAction(["DELETE",user])} className="btn-small"><FontAwesomeIcon icon="trash-can" /></button>;

        if (!user.isApproved) {
            return <>
                <button onClick={() => props.onAction(["APPROVE",user])} className="btn-small"><FontAwesomeIcon icon="thumbs-up" /></button>
                {deleteBtn}
            </>
        }

        const activeIcon = user.isActive ? <FontAwesomeIcon icon="lock" /> : <FontAwesomeIcon icon="lock-open" /> ;

        return <>
            <button disabled className="btn-small"><FontAwesomeIcon icon="magnifying-glass-plus" /></button>
            <button onClick={() => props.onAction(["TOGGLE_IS_ACTIVE",user])} className="btn-small">{activeIcon}</button>
            {!user.isAdmin && deleteBtn}
        </>;
    }

    return (
        <>
            <div id={isDesktop ? "paginated-user-table-container" : "paginated-user-table-container-mobile"} className="basic-table-container">
                <table>
                    <thead>
                        <tr>
                            <th className="text-center"><FontAwesomeIcon icon="user-tie" /></th>
                            <th className="text-center"><FontAwesomeIcon icon="clock-rotate-left" /></th>
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
                                    <td className="text-center text-middle"><Avatar user={it} size="sm" /> {usernameF(it)}</td>
                                    <td className="text-center text-middle">{lastLoginDateF(it)}</td>
                                    <td className="text-center text-middle">{isActiveF(it)}</td>
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
                            Mostrando p&aacute;gina {props.pageable.current + 1} de {props.pageable.pages} ({props.pageable.total} usuarios en total).
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

export default PaginatedUserTable;