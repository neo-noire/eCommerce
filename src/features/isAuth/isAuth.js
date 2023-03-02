import axios from "axios";

export const isAuth = async (token) => {
    
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/me?populate=*`, {
            headers: { Authorization: `Bearer ${token}` },
        })
       
        
        return response.data
    } catch (error) {
        console.error(error);
        console.error("Error While Getting Logged In User Details");
    }
};