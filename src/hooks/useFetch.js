import { useEffect, useState } from "react"
import { makeRequest } from "../features/makeRequest"

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await makeRequest.get(url)
                setData(response.data.data)
            } catch (error) {
                setData(null)
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()

    }, [url])


    return { data, loading, error }
}

export default useFetch;
