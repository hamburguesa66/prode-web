import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AwesomeButton from "./AwesomeButton/AwesomeButton";
import SearchInput from "./SearchInput/SearchInput";
import { User } from "../../model/User";
import dayjs from "dayjs";

export interface UserSelectorProps {
    title: string;
    onSelect: (user: User) => void;
}

const UserSelector = (props: UserSelectorProps) => {
    const [query, setQuery] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);

    const { response, loading, sendData } = useAxios({
        lazy: true,
        method: "GET",
        url: `/user/search?name=${query}`,
        data: {}
    });

    useEffect(() => {
        if (response?.data) {
            setUsers(response.data as User[])
        }
    }, [response]);

    useEffect(() => {
        if (query) {
            sendData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    return (
        <>
            <h3><FontAwesomeIcon icon="hand-point-right" /> {props.title}</h3>

            <h4>B&uacute;squeda r&aacute;pida por nombre:</h4>

            <SearchInput loading={loading} disabled={loading} onSearch={setQuery} />

            <h4>Resultados:</h4>

            <div className="selector-table-container">
                <table>
                    <thead>
                        <tr>
                            <th><FontAwesomeIcon icon="user-tie" className="ml-5" /></th>
                            <th><FontAwesomeIcon icon="calendar" /></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={3} className="text-left">
                                    <FontAwesomeIcon icon="spinner" spin /> Buscando ...
                                </td></tr>
                        ) : (
                            users.length === 0 ? (
                                <td colSpan={3} className="text-left">
                                    No se han encontrado resultados.
                                </td>
                            ) : (
                                users.map(it =>
                                    <tr key={it.uuid}>
                                        <td className="text-middle">
                                            {it.name}
                                        </td>
                                        <td className="text-middle">
                                            {dayjs(it.createdDate).format("DD/MM HH:mm")}
                                        </td>
                                        <td className="text-right text-middle">
                                            <AwesomeButton onClick={() => props.onSelect(it)} >
                                                <FontAwesomeIcon icon="hand-point-left" />
                                            </AwesomeButton>
                                        </td>
                                    </tr>
                                )
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UserSelector;