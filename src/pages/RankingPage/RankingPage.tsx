import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { UserScore } from "../../model/UserScore";
import RankingTable from "./RankingTable";

const RankingPage = () => {
    const { principal } = useUserContext();

    const [scores, setScores] = useState<UserScore[]>([]);

    const { response, loading } = useAxios({
        lazy: false,
        method: "GET",
        url: `/statistics/ranking`,
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
            {!principal.isAuthenticated ? (
                <Navigate to="/" replace={true} />
            ) : (
                <>
                    <h2>🏆 Ranking</h2>
                    <RankingTable scores={scores} loading={loading} />
                </>
            )}
        </>
    )
}

export default RankingPage;