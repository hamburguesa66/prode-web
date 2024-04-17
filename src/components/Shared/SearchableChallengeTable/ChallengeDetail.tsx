import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Challenge } from "../../../model/Challenge";
import ClickableSpan from "../ClickableSpan/ClickableSpan";
import CloseChallengeForm from "./CloseChallengeForm";
import DeleteChallengeForm from "./DeleteChallengeForm";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { UserScore } from "../../../model/UserScore";
import useAxios from "../../../hooks/useAxios";
import RankingTable from "../../../pages/RankingPage/components/RankingTable/RankingTable";

export interface ChallengeDetailProps {
    challenge: Challenge;
    isAdmin: Boolean;
    onClose: () => void;
    onRefresh: () => void;
}

const ChallengeDetail = (props: ChallengeDetailProps) => {

    const [scores, setScores] = useState<UserScore[]>([]);

    const { response, loading } = useAxios({
        lazy: false,
        method: "GET",
        url: `/user/score/challenge/${props.challenge?.id}`,
        data: undefined
    });

    useEffect(() => {
        if (response?.data) {
            const data = response.data as UserScore[];
            setScores(data.sort((s1, s2) => {
                if (s2.points === s1.points) {
                    return s2.accuracy - s1.accuracy
                } else {
                    return s2.points - s1.points
                }
            }));
        }
    }, [response]);

    const separator = () => {
        return <hr style={{ borderStyle: "dashed", borderColor: "#dbdbdb", borderWidth: "1px" }} />;
    }

    const status = (it: Challenge) => {
        switch (it.state) {
            case 'CREATED':
                return "No iniciado";
            case 'IN_PROGRESS':
                return "En curso";
            case 'ENDED':
                return "Finalizado (pendiente de cierre)"
            case 'CLOSED_WITHOUT_WINNER':
                return "Finalizado (sin ganadores, por empate)";
            case 'CLOSED_WITH_WINNER':
                return "Finalizado (con ganador)";
            default:
                return "";
        }
    }

    return (
        <>
            <h3 style={{ marginBottom: "0px" }}>
                <FontAwesomeIcon icon="hourglass" /> Desaf&iacute;o #{props.challenge.id}
            </h3>

            <h4 style={{ marginTop: "0px" }}>
                <ClickableSpan onClick={() => props.onClose()}>
                    <FontAwesomeIcon icon="backward" /> Regresar
                </ClickableSpan>
            </h4>

            {separator()}

            <p>
                <dl>
                    <dt>Nombre:</dt>
                    <dd>{props.challenge.name}</dd>

                    <dt>Fecha desde / hasta:</dt>
                    <dd>{dayjs(props.challenge.startDate).format("DD/MM HH:mm")} hasta {dayjs(props.challenge.endDate).format("DD/MM HH:mm")}</dd>

                    <dt>Estado:</dt>
                    <dd>{status(props.challenge)}</dd>

                    <dt>Competici&oacute;n:</dt>
                    <dd>{props.challenge.competition?.name || "Ninguna"}</dd>

                    <dt>Ganador:</dt>
                    <dd>{props.challenge.winner?.user.name || "-"}</dd>
                </dl>
            </p>

            <RankingTable scores={scores} loading={loading} />

            {props.isAdmin && <>
                {props.challenge.state === 'ENDED' && <>
                    {separator()}
                    <h4><FontAwesomeIcon icon="flag-checkered" /> Finalizar desaf&iacute;o:</h4>
                    <CloseChallengeForm challenge={props.challenge} onSuccess={(it) => props.onRefresh()} />
                </>}

                {props.challenge.state !== 'WHATEVER' && <>
                    {separator()}
                    <h4><FontAwesomeIcon icon="trash-alt" /> Eliminar desaf&iacute;o:</h4>
                    <DeleteChallengeForm challenge={props.challenge} onSuccess={() => props.onRefresh()} />
                </>}
            </>}
        </>
    )
}

export default ChallengeDetail;