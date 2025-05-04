import { useEffect, useState } from "react";


const useFetch = <any>(fetchFunction :() => Promise<any>, autoFetch = true    ) =>{
const [ data , setData] = useState<T | null>(null);
const [ loading , setLoading] = useState(false);
const [ error , setError] = useState<Error | null>(null);

const fetchData = async () => {
        try {
            setLoading(true);
            const result = await fetchFunction();
            setData(result);
        } catch (error) {
            // setError(error as Error);
            // @rs-ignore
            setError(error instanceof Error ? error : new Error('Something went wrong'));
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setData(null);
        setError(null);
        setLoading(false);
    };

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, []);

    // if (autoFetch) {
    //     fetchData();
    // }

    return { data, loading, error, refetch:fetchData,reset };
}


export default useFetch;
