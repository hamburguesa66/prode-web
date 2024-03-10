import { useEffect, useState } from 'react';
import AwesomeButton from '../../../../components/Shared/AwesomeButton/AwesomeButton';
import './RankingByCompetition.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Competition } from '../../../../model/Competition';
import { UserScore } from '../../../../model/UserScore';
import useAxios from '../../../../hooks/useAxios';
import Modal from 'react-responsive-modal';
import CompetitionSelector from '../../../../components/Shared/CompetitionSelector';
import RankingTable from '../RankingTable/RankingTable';

const RankingByCompetition = () => {

    const [competitionSelectorOpen, setCompetitionSelectorOpen] = useState<boolean>(false);
    const [competition, setCompetition] = useState<Competition>();
    const [scores, setScores] = useState<UserScore[]>([]);

    const { response, loading, sendData } = useAxios({
        lazy: true,
        method: "GET",
        url: `/user/score/competition/${competition?.id}`,
        data: undefined
    });

    const selectCompetiton = (competition: Competition) => {
        setCompetition(competition);
        setCompetitionSelectorOpen(false);
    };

    useEffect(() => {
        if (competition) {
            sendData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [competition]);

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
            <Modal
                open={competitionSelectorOpen}
                onClose={() => setCompetitionSelectorOpen(false)}
                center>
                <CompetitionSelector title="Seleccionar Competencia" onSelect={selectCompetiton} />
            </Modal>

            <h3><FontAwesomeIcon icon="trophy" /> Ranking por competici&oacute;n</h3>
            <p>Ut efficitur facilisis nibh, vitae tincidunt erat efficitur nec. Aliquam viverra pharetra dolor nec auctor. Proin tempor cursus nulla.</p>
            <div className="flex-container" id="ranking-by-competition-container">
                <div>
                    <input type="text" value={competition?.name || "Ninguna"} readOnly={true} />
                </div>
                <div>
                    <AwesomeButton className="full-width" disabled={loading} onClick={() => setCompetitionSelectorOpen(true)}>
                        <FontAwesomeIcon icon="pen-to-square" />
                    </AwesomeButton>
                </div>
            </div>
            <RankingTable scores={scores} loading={loading} />
        </>
    )
}

export default RankingByCompetition;