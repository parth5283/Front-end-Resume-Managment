import axios from "axios"

export const saveToProject = async (payload) => {
    return await axios.post(`http://localhost:8080/api/v1/employees/add-projects`, payload)
    .then((res)=> res.data)
    .catch((err)=> err.message)
}