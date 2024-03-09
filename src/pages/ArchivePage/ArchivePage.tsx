import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchableGameTable from "../../components/Shared/SearchableGameTable/SearchableGameTable";

const ArchivePage = () => {
    const { principal } = useUserContext();

    return (
        <>
            {!principal.isAuthenticated ? (
                <Navigate to="/" replace={true} />
            ) : (
                <>
                    <h2><FontAwesomeIcon icon="box-archive" /> Archivo</h2>
                    <SearchableGameTable />
                </>
            )}
        </>
    )
}

export default ArchivePage;