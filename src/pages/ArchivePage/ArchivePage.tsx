import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import SearchForm from "./components/SearchForm";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import PaginatedGameTable from "./components/PaginatedGameTable";
import { GameWithBet } from "../../model/GameWithBet";
import { Page } from "../../model/Page";

const ArchivePage = () => {
    const { principal } = useUserContext();

    const [query, setQuery] = useState<string>();
    const [page, setPage] = useState<number>(0);
    const [pageSize] = useState<number>(10);
    const [sortOrder] = useState<string>("DESC");
    const [pageable, setPageable] = useState<Page<GameWithBet>>(
        { total: 0, data: [], pages: 0, current: 0 }
    );

    const { response, loading, error, sendData } = useAxios({
        lazy: true,
        method: "GET",
        url: `/game/v2/list?page=${page}&size=${pageSize}&sortOrder=${sortOrder}&${query}`,
        data: {}
    });

    useEffect(() => {
        if (response?.data) {
            setPageable(response.data as Page<GameWithBet>);
        }
    }, [response]);

    useEffect(() => {
        if (error) {
            setPageable({ total: 0, data: [], pages: 0, current: 0 });
        }
    }, [error]);

    useEffect(() => {
        if (query) {
            sendData();
        }
    }, [query, page]);

    const onSearch = (completed: boolean, username: string) => {
        const base = `onlyWithResult=${completed}`;
        if (username && username.trim().length > 0) {
            setQuery(base + "&includeBetsFor=" + username);
        } else {
            setQuery(base);
        }
        setPage(0);
    }

    const nextPage = () => {
        setPage(page + 1);
    }

    const previousPage = () => {
        setPage(page - 1);
    }

    return (
        <>
            {!principal.isAuthenticated ? (
                <Navigate to="/" replace={true} />
            ) : (
                <>
                    <h2>🗃️ Archivo</h2>
                    <p>
                        El supremo. La fuente de la verdad. Ac&aacute; vas a poder ver todos los partidos del prode, con sus resultados (tuyos de y de otros usuarios) y otros detalles.
                    </p>
                    <SearchForm loading={loading} onSubmit={onSearch} />
                    <PaginatedGameTable
                        loading={loading}
                        pageable={pageable}
                        getNextPage={nextPage}
                        getPreviousPage={previousPage}
                    />
                </>
            )}
        </>
    )
}

export default ArchivePage;