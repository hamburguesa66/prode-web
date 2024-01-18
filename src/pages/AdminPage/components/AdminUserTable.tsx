import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import dayjs from "dayjs";
import { act } from "react-dom/test-utils";
import toast from "react-hot-toast";

export interface User {
    uuid: string,
    name: string,
    isApproved: Boolean,
    isActive: Boolean,
    isAdmin: Boolean,
    createdDate: Date,
    lastLoginDate: Date | undefined
}

const AdminUserTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [action, setAction] = useState<[string,User]>();

    const { response, loading, error, sendData } = useAxios({
        lazy: false,
        method: "GET",
        url: `/user`,
        data: undefined
    });

    useEffect(() => {
        if (response?.data) {
            setUsers(response.data as User[]);
        }
    }, [response]);

    const { 
        response: deleteResponse, 
        loading: deleteLoading, 
        error: deleteError, 
        sendData: sendDelete 
    } = useAxios({
        lazy: true,
        method: "DELETE",
        url: `/user?uuid=${action?.[1].uuid}`,
        data: {}
    });

    useEffect(() => {
        if (deleteResponse) {
            toast.success(`El usuario ${action?.[1].uuid} fue eliminado`);
            setAction(undefined);
        }
    }, [deleteResponse]);

    useEffect(() => {
        if (deleteError) {
            toast.error(`Harry, ha ocurrido un problema. Mirá la consola.`);
        }
    }, [deleteError]);

    const { 
        response: updateResponse, 
        loading: updateLoading, 
        error: updateError, 
        sendData: sendUpdate 
    } = useAxios({
        lazy: true,
        method: "POST",
        url: `/user`,
        data: action?.[1] 
    });

    useEffect(() => {
        if (updateResponse) {
            toast.success(`El usuario ${action?.[1].uuid} fue actualizado`);
            setAction(undefined);
        }
    }, [updateResponse]);

    useEffect(() => {
        if (updateError) {
            toast.error(`Harry, ha ocurrido un problema. Mirá la consola.`);
        }
    }, [updateError]);

    const deleteUser = (it: User): void => {
        setAction(["DELETE", it]);
    };

    const updateUser = (it: User, approved: Boolean): void => {
        setAction(["UPDATE", { ...it, isApproved: approved }])
    }

    useEffect(() => {
        if (action) {
            if(action[0] === "DELETE") {
                sendDelete();
            }
            if(action[0] === "UPDATE") {
                sendUpdate();
            }
        }
    }, [action]);

    return (
        <>
            <h3>👥 Usuarios</h3>
            <table>
                <thead>
                    <tr>
                        <th>Apodo</th>
                        <th>Fecha de registro</th>
                        <th>&Uacute;ltimo ingreso</th>
                        <th>Estado</th>
                        <th style={{ textAlign: "center" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(it => <tr>
                        <td>{it.name}</td>
                        <td>{dayjs(it.createdDate).format("DD/MM/YYYY")}</td>
                        <td>
                            {!it.lastLoginDate && "-"}
                            {it.lastLoginDate && dayjs(it.lastLoginDate).format("DD/MM/YYYY")}
                        </td>
                        <td>
                            {it.isApproved && <>Activo</>}
                            {!it.isApproved && <>Inactivo</>}
                        </td>
                        <td style={{ textAlign: "center" }}>
                            {it.isAdmin && <>-</>}
                            {!it.isAdmin && <>
                                <span onClick={() => deleteUser(it)}>🗑️</span>
                                &nbsp;|&nbsp;
                                <span>
                                    {it.isApproved && <span onClick={() => updateUser(it,false)}>⛔</span>}
                                    {!it.isApproved && it.lastLoginDate && <span onClick={() => updateUser(it,true)}>✅</span>}
                                    {!it.isApproved && !it.lastLoginDate && <span onClick={() => updateUser(it,true)}>👍</span>}
                                </span>
                            </>}
                        </td>
                    </tr>)}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>
                            Total de usuarios: {users.length}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}

export default AdminUserTable;