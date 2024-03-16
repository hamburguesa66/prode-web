import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Principal, useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

interface IAxiosRequest {
    lazy: boolean;
    method: string;
    url: string;
    data: any | undefined;
}

const useAxios = (axiosParams: IAxiosRequest) => {
    const { principal, setPrincipal } = useUserContext();
    const navigate = useNavigate();
    const [response, setResponse] = useState<AxiosResponse>();
    const [error, setError] = useState<AxiosError>();
    const [loading, setLoading] = useState(!axiosParams.lazy);

    const fetchData = async (params: IAxiosRequest) => {
        try {
            const result = await axios.request({
                method: params.method,
                baseURL: process.env.REACT_APP_API_URL,
                url: params.url,
                data: params.data,
                headers: { "nico": principal.token }
            });
            setResponse(result);
        } catch (err) {
            const error = err as AxiosError;
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if(error.response.status === 401 && !params.url.includes("/auth/")) {
                    toast("Su sesión ha expirado", { id: "401", icon: "ℹ️" });
                    setPrincipal(new Principal());
                    navigate("/");
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                // console.log('Error', error.message);
            }
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const sendData = () => {
        setLoading(true);
        fetchData(axiosParams);
    }

    useEffect(() => {
        if (!axiosParams.lazy) {
            fetchData(axiosParams);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { response, error, loading, sendData };
}

export default useAxios;