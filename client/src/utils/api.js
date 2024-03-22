import Axios from 'axios'

const axios = Axios.create({
    withCredentials: true,
})

export default axios
