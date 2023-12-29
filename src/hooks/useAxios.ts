import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useUserContext } from '../context/UserContext';

interface IAxiosRequest {
    lazy: boolean;
    method: string;
    url: string;
    data: any | undefined;
}

const useAxios = (axiosParams: IAxiosRequest) => {
    const { principal } = useUserContext();
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
            setError(err as AxiosError);
        } finally {
            setLoading(false);
        }
    };

    const sendData = () => {
        fetchData(axiosParams);
    }

    useEffect(() => {
        if (!axiosParams.lazy) {
            fetchData(axiosParams);
        }
    }, []);

    return { response, error, loading, sendData };
}

export default useAxios;