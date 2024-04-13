import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchableGameTable from "../../../components/Shared/SearchableGameTable/SearchableGameTable";

const GameAdminSection = () => {
    return (
        <>
            <h3><FontAwesomeIcon icon="bell" /> Partidos que requieren atenci&oacute;n</h3>
            <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec egestas ultrices posuere. Quisque fringilla consectetur velit, a vestibulum massa ullamcorper dictum.</p>
            <SearchableGameTable />
        </>
    )
}

export default GameAdminSection;