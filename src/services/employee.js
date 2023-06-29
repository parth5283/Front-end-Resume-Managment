import axios from "axios"

export const saveToEmployee = async (payload) => {
    return await axios.post(`http://localhost:8080/api/v1/employees/employee/save`, payload)
    .then((res)=> res.data)
    .catch((err)=> err.message)
}