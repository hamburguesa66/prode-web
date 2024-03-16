import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginatedUserTable from "./PaginatedUserTable/PaginatedUserTable";
import { useEffect, useState } from "react";
import { Page } from "../../../../model/Page";
import { User } from "../../../../model/User";
import useAxios from "../../../../hooks/useAxios";
import toast from "react-hot-toast";

const UserDashboard = () => {

    const [page, setPage] = useState<number>(0);
    const [pageSize] = useState<number>(10);
    const [sortOrder] = useState<string>("DESC");
    const [pageable, setPageable] = useState<Page<User>>({ total: 0, data: [], pages: 0, current: 0 });
    const [action, setAction] = useState<[string,User]>();

    const { response, loading, sendData } = useAxios({
        lazy: true,
        method: "GET",
        url: `/user/list?page=${page}&size=${pageSize}&sortOrder=${sortOrder}`,
        data: {}
    });

    useEffect(() => {
        if (response?.data) {
            setPageable(response.data as Page<User>);
        }
    }, [response]);

    useEffect(() => {
        sendData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const { response: dResponse, loading: dLoading, sendData: sendDelete } = useAxios({
        lazy: true,
        method: "DELETE",
        url: `/user?uuid=${action?.[1].uuid}`,
        data: {}
    });

    useEffect(() => {
        if (dResponse) {
            toast.success(`El usuario ${action?.[1].name} fue eliminado`);
            setAction(undefined);
            sendData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dResponse]);

    const { response: aResponse, loading: aLoading, sendData: sendApprove } = useAxios({
        lazy: true,
        method: "POST",
        url: `/user/approve?uuid=${action?.[1].uuid}`,
        data: {}
    });

    useEffect(() => {
        if (aResponse) {
            toast.success(`El usuario ${action?.[1].name} fue aprobado`);
            setAction(undefined);
            sendData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [aResponse]);

    const { response: iaResponse, loading: iaLoading, sendData: sendToggleIsActive } = useAxios({
        lazy: true,
        method: "POST",
        url: `/user/toggleIsActive?uuid=${action?.[1].uuid}`,
        data: {}
    });

    useEffect(() => {
        if (iaResponse) {
            toast.success(`El estado del usuario ${action?.[1].name} fue actualizado`);
            setAction(undefined);
            sendData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [iaResponse]);

    useEffect(() => {
        if (action) {
            if(action[0] === "DELETE") {
                sendDelete();
            }
            if(action[0] === "APPROVE") {
                sendApprove();
            }
            if(action[0] === 'TOGGLE_IS_ACTIVE') {
                sendToggleIsActive();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [action]);

    return (
        <>
            <h3><FontAwesomeIcon icon="users-between-lines" /> Usuarios</h3>
            <p>Pellentesque efficitur magna ac mauris hendrerit pretium. Nulla varius felis eget purus tincidunt porttitor. Quisque egestas vitae mauris id sollicitudin. Duis et commodo lorem. Praesent elit ligula, auctor ac facilisis vel, facilisis at enim.</p>

            <PaginatedUserTable 
                loading={loading || dLoading || aLoading || iaLoading}
                pageable={pageable}
                getNextPage={() => setPage(page + 1)}
                getPreviousPage={() => setPage(page - 1)}
                onAction={(action) => setAction(action)}
            />
        </>
    )
}

export default UserDashboard;