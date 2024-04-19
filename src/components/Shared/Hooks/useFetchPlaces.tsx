import { useEffect } from "react";
import axios from 'axios'
import { useState } from "react";
import { Place } from "../../../interfaces/place";
import { api } from "../../../services/api";


/* https:/openlibrary.org/search.json */

export default function useFetchPlaces(route: string, page: number, limit: number, order: string) {
    const [fetchedPlaces, setPlaces] = useState<Place[]>([]);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setPlaces([])
    }, [order])

    useEffect(() => {
        const cancel = new AbortController();
        const fetchData = async () => {
            setLoading(true)
            try {
                const { data } = await axios(api + route, {
                    method: "GET",
                    params: { page, limit, order },
                    signal: cancel.signal
                });

                setPlaces(prev => [...prev, ...data])

                if (data.length > 0) {
                    setHasMore(true)
                } else {
                    setHasMore(false)
                }

                setLoading(false)
            } catch (error) {
                if (axios.isCancel(error)) return
                setLoading(false)
            }
        }


        fetchData();

        return () => cancel.abort();
    }, [page, order])

    return { hasMore, loading, fetchedPlaces }
}