import axios from "./customize-axios";
const fetchAllRooms = () => {
    return axios.get(`api/rooms`);
}
const getRoom = (roomNumber) => {
    return axios.get(`api/rooms/${roomNumber}`);
}
export { fetchAllRooms, getRoom };