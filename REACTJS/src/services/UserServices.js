import axios from "./customize-axios";
const fetchAllUser = (page) => {
    return axios.get(`api/user?page=${page}`);
}
const deleteUser = (id) => {
    return axios.delete(`api/user/${id}`);
}
const postCreateUser = (email, first_name, last_name, avatar) => {
    return axios.post("/api/user", { email: email, first_name: first_name, last_name: last_name, avatar: avatar });
}
const getbyideUser = (id) => {
    return axios.get(`/api/user/getbyiduser/${id}`);
}
const putUpdateUser = (id, email, first_name, last_name, avatar) => {
    return axios.post(`/api/user/edituser`, { id: id, email: email, first_name: first_name, last_name: last_name, avatar: avatar });
}
export { fetchAllUser, postCreateUser, deleteUser, getbyideUser, putUpdateUser };