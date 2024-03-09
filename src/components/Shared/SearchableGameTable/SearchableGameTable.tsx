import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { Game } from "../../../model/Game";
import { Page } from "../../../model/Page";
import PaginatedGameTable from "./PaginatedGameTable/PaginatedGameTable";
import SearchGameForm from "./SearchGameForm/SearchGameForm";

const SearchableGameTable = () => {
    const [query, setQuery] = useState<string>("&");
    const [page, setPage] = useState<number>(0);
    const [pageSize] = useState<number>(10);
    const [sortOrder] = useState<string>("DESC");
    const [pageable, setPageable] = useState<Page<Game>>(
        { total: 0, data: [], pages: 0, current: 0 }
    );

    const { response, loading, error, sendData } = useAxios({
        lazy: true,
        method: "GET",
        url: `/game/list?page=${page}&size=${pageSize}&sortOrder=${sortOrder}${query}`,
        data: {}
    });

    useEffect(() => {
        if (response?.data) {
            setPageable(response.data as Page<Game>);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, page]);

    const onSearch = (status: string) => {
        if (status === "ALL") {
            setQuery("&");
        } else {
            setQuery("&state=" + status);
        }
        setPageable({ total: 0, data: [], pages: 0, current: 0 });
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
            <SearchGameForm loading={loading} onSubmit={onSearch} />
            <PaginatedGameTable
                loading={loading}
                pageable={pageable}
                getNextPage={nextPage}
                getPreviousPage={previousPage}
            />
        </>
    )
}

export default SearchableGameTable;