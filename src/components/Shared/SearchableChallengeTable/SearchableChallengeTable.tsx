import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { Page } from "../../../model/Page";
import { useUserContext } from "../../../context/UserContext";
import { Challenge } from "../../../model/Challenge";
import PaginatedChallengeTable from "./PaginatedChallengeTable";
import Modal from "react-responsive-modal";
import ChallengeDetail from "./ChallengeDetail";

const SearchableChallengeTable = () => {
    const { principal } = useUserContext();
    const [page, setPage] = useState<number>(0);
    const [pageSize] = useState<number>(10);
    const [sortOrder] = useState<string>("DESC");
    const [pageable, setPageable] = useState<Page<Challenge>>(
        { total: 0, data: [], pages: 0, current: 0 }
    );
    const [selectedChallenge, setSelectedChallenge] = useState<Challenge>();
    const [isDetailModalOpen, setDetailModalOpen] = useState<boolean>(false);

    const { response, loading, sendData } = useAxios({
        lazy: true,
        method: "GET",
        url: `/challenge?page=${page}&size=${pageSize}&sortOrder=${sortOrder}`,
        data: {}
    });

    useEffect(() => {
        if (response?.data) {
            setPageable(response.data as Page<Challenge>);
        }
    }, [response]);

    useEffect(() => {
        sendData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const nextPage = () => {
        setPage(page + 1);
    }

    const previousPage = () => {
        setPage(page - 1);
    }

    useEffect(() => {
        if (!isDetailModalOpen) {
            setSelectedChallenge(undefined);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedChallenge]);

    return (
        <>
            <Modal
                open={isDetailModalOpen}
                onClose={() => setDetailModalOpen(false)}
                showCloseIcon={false}
                closeOnOverlayClick={false}
                closeOnEsc={false}
                center>
                {selectedChallenge && <ChallengeDetail
                    challenge={selectedChallenge}
                    isAdmin={principal.isAdmin}
                    onClose={() => setDetailModalOpen(false)}
                    onRefresh={() => { setDetailModalOpen(false); sendData(); }} />
                }
            </Modal>
            <PaginatedChallengeTable
                loading={loading}
                pageable={pageable}
                getNextPage={nextPage}
                getPreviousPage={previousPage}
                onSelection={(it) => { setSelectedChallenge(it); setDetailModalOpen(true); }}
            />
        </>
    )
}

export default SearchableChallengeTable;