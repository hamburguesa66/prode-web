import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RankingTable from "./RankingTable/RankingTable";
import { UserScore } from "../../../model/UserScore";
import useAxios from "../../../hooks/useAxios";

const GeneralRanking = () => {
    const [scores, setScores] = useState<UserScore[]>([]);

    const { response, loading } = useAxios({
        lazy: false,
        method: "GET",
        url: `/user/score`,
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

    return (
        <>
            <h3><FontAwesomeIcon icon="book" /> Ranking hist&oacute;rico</h3>
            <p>Cras id nunc felis. Integer et libero porttitor, consectetur mauris quis, vehicula velit. Praesent eget hendrerit neque, ac lobortis ex. Vestibulum facilisis nibh augue, in tincidunt ipsum luctus quis.</p>
            <RankingTable scores={scores} loading={loading} />
        </>
    )
}

export default GeneralRanking;