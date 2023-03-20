import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { avatarStore, addUserInfo } from "../store/userSlice/userSlice"

const useAuth = (token) => {
    const [data, setData] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!token) return
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/me?populate=*`, {
                    headers: { Authorization: `Bearer ${token}` },
                })

                const imgId = parseInt(response.data.imgId)

                const img = await axios.get(`${process.env.REACT_APP_API_URL}/user-imgs/${imgId}?populate=*`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setData(response.data)
                setAvatar(img?.data?.data?.attributes?.avatar?.data?.attributes)

                dispatch(addUserInfo(response.data))
                dispatch(avatarStore(img?.data?.data.attributes?.avatar?.data?.attributes))

                console.log('asasas');
            } catch (error) {
                setData(null)
                setError(error)
            } finally {
                setLoading(false)
                console.log('hook worked');
            }
        }
        fetchData()

    }, [token, dispatch])




    return { data, loading, error, avatar }
}

export default useAuth;
