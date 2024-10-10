using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
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
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatController(CuocHoiThoaiService cuocHoiThoaiService, NguoiThamGiaService nguoiThamGiaService, TinNhanService tinNhanService, UserService userService, IHubContext<ChatHub> hubContext)
        {
            this.cuocHoiThoaiService = cuocHoiThoaiService;
            this.nguoiThamGiaService = nguoiThamGiaService;
            this.tinNhanService = tinNhanService;
            this.userService = userService;
            _hubContext = hubContext;
        }



        [HttpGet("TimKiem")]
        public async Task<IActionResult> TimKiemTheoTieuDeHoacTenUser([FromQuery] string tuKhoa)
        {
            var cuocHoiThoais = await cuocHoiThoaiService.TimKiemTheoTieuDeHoacTenUserAsync(tuKhoa);
            return Ok(cuocHoiThoais);
        }

        [HttpPost("AddTinNhan")]
        public async Task<IActionResult> AddTinNhan([FromBody] TinNhans tinNhan)
        {
            if (tinNhan == null)
            {
                return BadRequest("Tin nhắn không hợp lệ.");
            }

            try
            {
                var newTinNhan = new TinNhan
                {
                    CuocHoiThoaiId = tinNhan.CuocHoiThoaiId,
                    NhanVienGuiId = tinNhan.NhanVienGuiId,
                    LoaiTinNhan = tinNhan.LoaiTinNhan,
                    Noidung = tinNhan.Noidung,
                    Duoctaovao = DateTime.Now,
                    Daxoavao = DateTime.Now
                };

                await tinNhanService.AddTinNhanAsync(newTinNhan);
                /// update thowif gian cuoocj hooij thoaij
                await _hubContext.Clients.All.SendAsync("ReceiveMessage", newTinNhan.CuocHoiThoaiId, newTinNhan.NhanVienGuiId, newTinNhan.Noidung);
                CuocHoiThoai cuocHoiThoai = await cuocHoiThoaiService.GetCuocHoiThoaiByIdAsync(newTinNhan.CuocHoiThoaiId);
                cuocHoiThoai.Duoctaovao = DateTime.Now; // Cập nhật thời gian mới nhất của cuộc hội thoại
                await cuocHoiThoaiService.UpdateCuocHoiThoaiAsync(cuocHoiThoai);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi máy chủ: {ex.Message}");
            }
        }





        [HttpGet("GetLatestCuocHoiThoai/{userId}")]
        public async Task<IActionResult> GetLatestCuocHoiThoai(int userId)
        {
            try
            {
                var latestCuocHoiThoai = await cuocHoiThoaiService.GetLatestCuocHoiThoaiAsync(userId);

                if (latestCuocHoiThoai == null)
                {
                    return NotFound("Không tìm thấy cuộc hội thoại mới nhất.");
                }

                return Ok(latestCuocHoiThoai);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi máy chủ: {ex.Message}");
            }
        }

        /* [HttpGet("DanhSachCuocTroChuyen/{idusserlogin}/{cuochoithoaiid}")]
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
                 /// lấy danh sách tin nhắn từ idhoithoai
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
         }*/
        [HttpGet("DanhSachCuocTroChuyen/{idusserlogin}")]
        public async Task<IActionResult> DanhSachCuocTroChuyen(int idusserlogin)
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
                    }

                    danhSachCuocTroChuyen.Add(new
                    {
                        Ten = ten,
                        NoiDungTinNhan = noidungtinnhan,
                        ThoiGianNhan = thoigiannhan,
                        cuochoithoaiids = cuocHoiThoai.Id
                    });
                }

                return Ok(new
                {
                    danhsachtrochuyen = danhSachCuocTroChuyen
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
        [HttpGet("DanhSachTinNhan/{cuochoithoaiid}")]
        public async Task<IActionResult> DanhSachTinNhan(int cuochoithoaiid)
        {
            try
            {
                List<TinNhan> tinNhanList = await tinNhanService.GetTinNhanListByIdCuocTroChuyenAsync(cuochoithoaiid);
                CuocHoiThoai cuocHoiThoai = await cuocHoiThoaiService.GetCuocHoiThoaiByIdAsync(cuochoithoaiid);
                string ten = "";
                string avatar = "";
                if (cuocHoiThoai.LoaiHoiThoai == "1-1")
                {
                    List<NguoiThamGia> nguoiThamGiaList = await nguoiThamGiaService.GetNguoiThamGiaListByIdAsync(cuocHoiThoai.Id);
                    foreach (var nguoiThamGia in nguoiThamGiaList)
                    {
                        User nhanVienThamGia = await userService.GetUserByIdAsync(nguoiThamGia.NhanVienThamGiaId);
                        if (nhanVienThamGia != null && nguoiThamGia.NhanVienThamGiaId != tinNhanList[0].NhanVienGuiId)
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
                var danhsachtinnhan = tinNhanList.Select(tn => new
                {
                    NhanVienGuiId = tn.NhanVienGuiId,
                    NoiDung = tn.Noidung,
                    ThoiGianNhan = tn.Duoctaovao,
                    Ten = ten
                }).ToList();

                return Ok(new
                {
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