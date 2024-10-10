import axios from "./customize-axios";

const DanhSachCuocTroChuyen = (idusserlogin) => {
    return axios.get(`api/chat/DanhSachCuocTroChuyen/${idusserlogin}`);
};

const DanhSachTinNhan = (cuochoithoaiid) => {
    return axios.get(`api/chat/DanhSachTinNhan/${cuochoithoaiid}`);
};

const GetLatestCuocHoiThoai = (userId) => {
    return axios.get(`api/chat/GetLatestCuocHoiThoai/${userId}`);
};

const AddTinNhan = async (tinNhan) => {
    try {
        const response = await axios.post("api/chat/AddTinNhan", tinNhan);
        return response.data;
    } catch (error) {
        console.error("Error adding tin nhan:", error);
        throw error; 
    }
};


export { DanhSachCuocTroChuyen, DanhSachTinNhan, GetLatestCuocHoiThoai, AddTinNhan };
