import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchableGameTable from "../../components/Shared/SearchableGameTable/SearchableGameTable";
import FaceToFace from "./components/FaceToFace";

const ArchivePage = () => {
    const { principal } = useUserContext();

    return (
        <>
            {!principal.isAuthenticated ? (
                <Navigate to="/" replace={true} />
            ) : (
                <>
                    <h2><FontAwesomeIcon icon="box-archive" /> Archivo</h2>
                    <p>Proin feugiat odio vel augue commodo mollis. Curabitur quis est ut turpis varius rhoncus sit amet eget eros. Sed sapien turpis, elementum vitae consequat quis, egestas vitae tortor.</p>
                    
                    <h3><FontAwesomeIcon icon="database" /> Todos los partidos</h3>
                    <p>Vestibulum euismod, velit id mollis auctor, velit diam elementum tortor, in ullamcorper erat magna et tellus. Mauris interdum dapibus dui iaculis dignissim. Proin vitae urna et velit bibendum venenatis eget in massa. Suspendisse ullamcorper imperdiet leo. Vestibulum fringilla ex id tortor aliquam porttitor.</p>
                    <SearchableGameTable />

                    <h3><FontAwesomeIcon icon="heart-pulse" /> Cara a cara</h3>
                    <p>Vivamus rhoncus gravida metus at efficitur. Mauris non bibendum neque, nec luctus nunc. Duis orci nibh, laoreet vitae facilisis eleifend, mollis sed odio. In dapibus auctor ligula.</p>
                    <FaceToFace />
                </>
            )}
        </>
    )
}

export default ArchivePage;