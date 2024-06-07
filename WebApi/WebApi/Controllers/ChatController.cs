using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly CuocHoiThoaiService cuocHoiThoaiService;
        private readonly NguoiThamGiaService nguoiThamGiaService;
        private readonly TinNhanService tinNhanService;
        private readonly UserService userService;
        public ChatController(CuocHoiThoaiService cuocHoiThoaiService, NguoiThamGiaService nguoiThamGiaService, TinNhanService tinNhanService, UserService userService)
        {
            this.cuocHoiThoaiService = cuocHoiThoaiService;
            this.nguoiThamGiaService = nguoiThamGiaService;
            this.tinNhanService = tinNhanService;
            this.userService = userService;
        }
        [HttpGet("DanhSachCuocTroChuyen/{idusserlogin}/{cuochoithoaiid}")]
        public async Task<IActionResult> DanhSachCuocTroChuyen(int idusserlogin, int cuochoithoaiid)
        {
            try
            {
                List<CuocHoiThoai> cuocHoiThoaiList = await cuocHoiThoaiService.GetCuocHoiThoaiListByIdAsync(idusserlogin);
                var danhSachCuocTroChuyen = new List<object>();

                foreach (var cuocHoiThoai in cuocHoiThoaiList)
                {
                    string ten = "";
                    string noidungtinnhan = "";
                    DateTime thoigiannhan = DateTime.Now;
                    int nhanVienGuiId = 0;
                    int cuochoithoai = 0;
                    if (cuocHoiThoai.LoaiHoiThoai == "1-1")
                    {
                        List<NguoiThamGia> nguoiThamGiaList = await nguoiThamGiaService.GetNguoiThamGiaListByIdAsync(cuocHoiThoai.Id);
                        foreach (var nguoiThamGia in nguoiThamGiaList)
                        {
                            User nhanVienThamGia = await userService.GetUserByIdAsync(nguoiThamGia.NhanVienThamGiaId);
                            if (nhanVienThamGia != null && nguoiThamGia.NhanVienThamGiaId != idusserlogin)
                            {
                                ten = nhanVienThamGia.first_name;
                                break;
                            }
                        }
                    }
                    else if (cuocHoiThoai.LoaiHoiThoai == "nhóm")
                    {
                        ten = cuocHoiThoai.Tieude;
                    }

                    TinNhan tinNhan = await tinNhanService.GetLatestTinNhanByIdCuocTroChuyenAsync(cuocHoiThoai.Id);
                    if (tinNhan != null)
                    {
                        noidungtinnhan = tinNhan.Noidung;
                        thoigiannhan = tinNhan.Duoctaovao;
                        nhanVienGuiId = tinNhan.NhanVienGuiId;
                    }

                    danhSachCuocTroChuyen.Add(new
                    {
                        Ten = ten,
                        NoiDungTinNhan = noidungtinnhan,
                        ThoiGianNhan = thoigiannhan,
                        NhanVienGuiId = nhanVienGuiId,
                        cuochoithoaiids = cuocHoiThoai.Id
                    });
                }
                List<TinNhan> tinNhanList = await tinNhanService.GetTinNhanListByIdCuocTroChuyenAsync(cuochoithoaiid);
                var danhsachtinnhan = tinNhanList.Select(tn => new
                {
                    NhanVienGuiId = tn.NhanVienGuiId,
                    NoiDung = tn.Noidung,
                    ThoiGianNhan = tn.Duoctaovao
                }).ToList();

                return Ok(new
                {
                    danhsachtrochuyen = danhSachCuocTroChuyen,
                    danhsachtinnhan = danhsachtinnhan
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}