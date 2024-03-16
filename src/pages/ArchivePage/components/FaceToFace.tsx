import { useEffect, useState } from "react";
import { User } from "../../../model/User";
import useAxios from "../../../hooks/useAxios";
import { Game } from "../../../model/Game";
import { Page } from "../../../model/Page";
import { Bet } from "../../../model/Bet";
import FaceToFaceSearchInput from './FaceToFaceSearchInput';
import FaceToFaceGameTable from "./FaceToFaceGameTable/FaceToFaceGameTable";

const FaceToFace = () => {

    const [games, setGames] = useState<Page<Game>>();
    const [userABets, setUserABets] = useState<Bet[]>([]);
    const [userBBets, setUserBBets] = useState<Bet[]>([]);

    const [userA, setUserA] = useState<User>();
    const [userB, setUserB] = useState<User>();

    const { response: gResponse, loading: gLoading, sendData: getGames } = useAxios({
        lazy: true,
        method: "GET",
        url: `/game/list?page=0&size=10&sortOrder=DESC&state=DONE`,
        data: undefined
    });

    const { response: buaResponse, loading: buaLoading, sendData: getUserABets } = useAxios({
        lazy: true,
        method: "GET",
        url: `/bet/list?uuid=${userA?.uuid}&gameIds=${games?.data.map(it => it.id).join(",")}`,
        data: undefined
    });

    const { response: bubResponse, loading: bubLoading, sendData: getUserBBets } = useAxios({
        lazy: true,
        method: "GET",
        url: `/bet/list?uuid=${userB?.uuid}&gameIds=${games?.data.map(it => it.id).join(",")}`,
        data: undefined
    });

    const loading = gLoading || buaLoading || bubLoading;

    useEffect(() => {
        if (gResponse?.data) {
            setGames(gResponse.data as Page<Game>);
        }
    }, [gResponse]);

    useEffect(() => {
        if (games?.data) {
            getUserABets();
            getUserBBets();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [games]);

    useEffect(() => {
        if (buaResponse?.data) {
            setUserABets(buaResponse.data as Bet[]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buaResponse]);

    useEffect(() => {
        if (bubResponse?.data) {
            setUserBBets(bubResponse.data as Bet[]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bubResponse]);

    const search = (userA: User, userB: User) => {
        setUserA(userA);
        setUserB(userB);
    }

    useEffect(() => {
        if (userA && userB) {
            getGames();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userA,userB]);

    return (
        <>
            <FaceToFaceSearchInput disable={loading} onSearch={search} />

            <FaceToFaceGameTable 
                loading={loading}
                games={games?.data} 
                userA={userA}
                userABets={userABets}
                userB={userB}
                userBBets={userBBets} />
        </>
    )
}

export default FaceToFace;