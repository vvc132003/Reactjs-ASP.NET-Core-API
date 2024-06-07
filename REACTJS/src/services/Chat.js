import axios from "./customize-axios";
const DanhSachCuocTroChuyen = (idusserlogin, cuochoithoaiid) => {
    return axios.get(`api/chat/DanhSachCuocTroChuyen/${idusserlogin}/${cuochoithoaiid}`);
};


export { DanhSachCuocTroChuyen };
