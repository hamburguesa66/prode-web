import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AwesomeButton from "./AwesomeButton/AwesomeButton";
import SearchInput from "./SearchInput/SearchInput";
import { Competition } from "../../model/Competition";

export interface CompetitionSelectorProps {
    title: string;
    onSelect: (competition: Competition) => void;
}

const CompetitionSelector = (props: CompetitionSelectorProps) => {
    const [query, setQuery] = useState<string>("");
    const [competitions, setCompetitions] = useState<Competition[]>([]);

    const { response, loading, sendData } = useAxios({
        lazy: true,
        method: "GET",
        url: `/competition?name=${query}`,
        data: {}
    });

    useEffect(() => {
        if (response?.data) {
            setCompetitions(response.data as Competition[])
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
                            <th><FontAwesomeIcon icon="image" className="ml-5" /></th>
                            <th><FontAwesomeIcon icon="signature" /></th>
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
                            competitions.length === 0 ? (
                                <td colSpan={3} className="text-left">
                                    No se han encontrado resultados.
                                </td>
                            ) : (
                                competitions.map(it =>
                                    <tr key={it.id}>
                                        <td className="text-middle">
                                            <img src={it.logo} alt={it.name} width={24} height={24} />
                                        </td>
                                        <td className="text-middle">
                                            {it.name}
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

export default CompetitionSelector;