using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class Likes
    {
        public int id { get; set; }
        public int idphong { get; set; }
        public int idkhachhang { get; set; }
        public DateTime thoigianlike { get; set; }
        public string icons { get; set; }
    }
}
using ketnoicsdllan1;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Service
{
    public class LikesService
    {
        public bool CheckIfLiked(int idKhachHang, int idPhong)
        {
            bool liked = false;

            using (SqlConnection connection = DBUtils.GetDBConnection())
            {
                connection.Open();

                string query = "SELECT COUNT(*) FROM Likes WHERE idphong = @IdPhong AND idkhachhang = @IdKhachHang";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@IdPhong", idPhong);
                    command.Parameters.AddWithValue("@IdKhachHang", idKhachHang);

                    int count = Convert.ToInt32(command.ExecuteScalar());

                    if (count > 0)
                    {
                        liked = true;
                    }
                }
            }

            return liked;
        }

        public int CountLikesByIdPhong(int idPhong)
        {
            int countLikes = 0;

            using (SqlConnection connection = DBUtils.GetDBConnection())
            {
                connection.Open();

                string query = "SELECT count(idkhachhang) AS TotalLikes FROM Likes WHERE idphong = @IdPhong";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@IdPhong", idPhong);

                    object result = command.ExecuteScalar();

                    if (result != null && result != DBNull.Value)
                    {
                        countLikes = Convert.ToInt32(result);
                    }
                }
            }

            return countLikes;
        }

        public void CapNhatLike(Likes like)
        {
            using (SqlConnection connection = DBUtils.GetDBConnection())
            {
                connection.Open();
                string query = "UPDATE Likes SET idphong = @IdPhong, idkhachhang = @IdKhachHang, thoigianlike = @ThoiGianLike, icons = @Icons WHERE id = @Id";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@IdPhong", like.idphong);
                    command.Parameters.AddWithValue("@IdKhachHang", like.idkhachhang);
                    command.Parameters.AddWithValue("@ThoiGianLike", like.thoigianlike);
                    command.Parameters.AddWithValue("@Icons", like.icons);
                    command.Parameters.AddWithValue("@Id", like.id);
                    command.ExecuteNonQuery();
                }
            }
        }

        public List<Likes> GetAllLikes()
        {
            using (SqlConnection connection = DBUtils.GetDBConnection())
            {
                List<Likes> likesList = new List<Likes>();
                connection.Open();
                string query = "SELECT id, idphong, idkhachhang, thoigianlike, icons FROM Likes";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Likes like = new Likes();
                            like.id = Convert.ToInt32(reader["id"]);
                            like.idphong = Convert.ToInt32(reader["idphong"]);
                            like.idkhachhang = Convert.ToInt32(reader["idkhachhang"]);
                            like.thoigianlike = Convert.ToDateTime(reader["thoigianlike"]);
                            like.icons = reader["icons"].ToString();
                            likesList.Add(like);
                        }
                    }
                }
                return likesList;
            }
        }

        public Likes GetLikeById(int likeId)
        {
            using (SqlConnection connection = DBUtils.GetDBConnection())
            {
                connection.Open();
                string query = "SELECT id, idphong, idkhachhang, thoigianlike, icons FROM Likes WHERE id = @Id";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Id", likeId);
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Likes like = new Likes();
                            like.id = Convert.ToInt32(reader["id"]);
                            like.idphong = Convert.ToInt32(reader["idphong"]);
                            like.idkhachhang = Convert.ToInt32(reader["idkhachhang"]);
                            like.thoigianlike = Convert.ToDateTime(reader["thoigianlike"]);
                            like.icons = reader["icons"].ToString();

                            return like;
                        }
                        return null;
                    }
                }
            }
        }

        public void InsertLike(Likes like)
        {
            using (SqlConnection connection = DBUtils.GetDBConnection())
            {
                connection.Open();
                string query = "INSERT INTO Likes (idphong, idkhachhang, icons) VALUES (@IdPhong, @IdKhachHang, @Icons)";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@IdPhong", like.idphong);
                    command.Parameters.AddWithValue("@IdKhachHang", like.idkhachhang);
                    command.Parameters.AddWithValue("@Icons", like.icons);
                    command.ExecuteNonQuery();
                }
            }
        }

        public void DeleteLike(int likeId)
        {
            using (SqlConnection connection = DBUtils.GetDBConnection())
            {
                string query = "DELETE FROM Likes WHERE id = @Id";
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@Id", likeId);

                connection.Open();
                command.ExecuteNonQuery();
            }
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Service;

namespace QuanLyKhachSan_MVC.NET.Controllers
{
    public class LikesController : Controller
    {
        private readonly LikesService likesService;
        public LikesController(LikesService likesService)
        {
            this.likesService = likesService;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult LikesPhong(int idphong)
        {
            if (HttpContext.Session.GetInt32("id") != null && HttpContext.Session.GetString("hovaten") != null)
            {
                int id = HttpContext.Session.GetInt32("id").Value;
                string hovaten = HttpContext.Session.GetString("hovaten");
                ViewData["id"] = id;
                ViewData["hovaten"] = hovaten;
                bool isLiked = likesService.CheckIfLiked(id, idphong);
                if (!isLiked)
                {
                    Likes likes = new Likes();
                    likes.idkhachhang = id;
                    likes.idphong = idphong;
                    likes.icons = "❤️";
                    likesService.InsertLike(likes);
                    return Ok();
                }
                else
                {
                    return Ok();
                }
            }
            else
            {
                return RedirectToAction("dangnhap", "dangnhap");
            }
        }
        public IActionResult CountLikeByIdPhong(int idphong)
        {
            int sumlikesidphong = likesService.CountLikesByIdPhong(idphong);
            return Json(new { sumlikesidphong });
        }
    }
}
<div id="likesSummary">
    Likes: <span id="totalLikes"></span>
    <button id="likeButton">Like</button>
</div>
<style>

    #likesSummary {
        border: 1px solid #ccc;
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        width: 300px;
        margin: 0 auto; /* Center the container */
        text-align: center;
    }

    #totalLikes {
        font-weight: bold;
        color: #333;
    }

    #likeButton {
        background-color: #4CAF50;
        color: white;
        border: none;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin-top: 10px;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.3s ease;
    }

        #likeButton:hover {
            background-color: #45a049;
        }
</style>
<script>
    $(document).ready(function () {
        function loadLikesCount() {
            $.ajax({
                type: "GET",
                url: "/Likes/CountLikeByIdPhong",
                data: { idphong: @Model.phong.id },
                success: function (result) {
                    $("#totalLikes").text(result.sumlikesidphong);
                },
                error: function (error) {
                    console.error(error);
                }
            });
        }

        loadLikesCount();

        $("#likeButton").click(function () {
            $.ajax({
                type: "GET",
                url: "/Likes/LikesPhong",
                data: { idphong: @Model.phong.id },
                success: function () {
                    loadLikesCount();
                },
                error: function (error) {
                    console.error(error);
                }
            });
        });
    });
</script>


        public IActionResult UpdateNhanVien(int idnhanvien)
        {
            if (HttpContext.Session.GetInt32("id") != null && HttpContext.Session.GetString("tenchucvu") != null && HttpContext.Session.GetInt32("idkhachsan") != null && HttpContext.Session.GetString("hovaten") != null)
            {
                if (HttpContext.Session.GetString("tenchucvu").Equals("Quản lý"))
                {
                    int idkhachsan = HttpContext.Session.GetInt32("idkhachsan").Value;
                    int id = HttpContext.Session.GetInt32("id").Value;
                    string hovaten = HttpContext.Session.GetString("hovaten");
                    string tenchucvu = HttpContext.Session.GetString("tenchucvu");
                    ViewData["id"] = id;
                    ViewData["hovaten"] = hovaten;
                    ViewData["tenchucvu"] = tenchucvu;
                    ViewData["idkhachsan"] = idkhachsan;
                    List<ChucVu> chucVus = chucVuService.GetAllChucVu();
                    List<KhachSan> listkhachsan = khachSanService.GetAllKhachSan();
                    NhanVien nhanVien = nhanVienService.GetNhanVienID(idnhanvien);
                    Modeldata modeldata = new Modeldata
                    {
                        listchucVu = chucVus,
                        listKhachSan = listkhachsan,
                        nhanVien = nhanVien
                    };
                    return View(modeldata);
                }
                else
                {
                    return RedirectToAction("dangnhap", "dangnhap");
                }
            }
            else
            {
                return RedirectToAction("dangnhap", "dangnhap");
            }
        }
@model Model.Models.Modeldata
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
<link rel='stylesheet'
      href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
<link href="~/css/home.css" rel="stylesheet" />
<link href="~/css/morris.css" rel="stylesheet" />
<link href="~/css/c3.min.css" rel="stylesheet" />
@Html.Partial("~/Views/layout/logo.cshtml")
<link href="~/css/dashboard1.css" rel="stylesheet" />
<link href="~/css/site.css" rel="stylesheet" />
<div class="skin-default-dark fixed-layout">
    <div id="main-wrapper">
        @Html.Partial("~/Views/layout/navbar.cshtml")
        @Html.Partial("~/Views/layout/header.cshtml")
        <br />
        <div class="page-wrapper">
            <div class="container-fluid">
                <div class="card">
                    <div class="row">
                        <div class="col-12">
                            <div class="text-bg-success p-2">Cập nhật nhân viên</div>
                            <div class="border border-secondary-subtle" style="padding:10px 20px">
                                @if (Model.nhanVien != null)
                                {
                                    <form Action="/NhanVien/" method="POST">
                                        <input type="hidden" id="id" name="id" value="@Model.nhanVien.id" />
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="mb-3">
                                                    <label for="hovaten" class="form-label">
                                                        Họ tên nhân viên:
                                                    </label>
                                                    <input type="text" class="form-control" value="@Model.nhanVien.hovaten" id="hovaten" name="hovaten">
                                                </div>
                                                <div class="mb-3">
                                                    <label for="sodienthoai" class="form-label">
                                                        Số điện thoại:
                                                    </label>
                                                    <input type="text" class="form-control" value="@Model.nhanVien.sodienthoai" id="sodienthoai" name="sodienthoai">
                                                </div>
                                                <div class="mb-3">
                                                    <label for="tinh" class="form-label">Tỉnh:</label>
                                                    <select id="tinh" name="tinh" class="form-control">
                                                        <option value="@Model.nhanVien.tinh" selected>Chọn tỉnh thành</option>
                                                    </select>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="huyen" class="form-label">Quận/huyện:</label>
                                                    <select id="huyen" name="huyen" class="form-control">
                                                        <option value="@Model.nhanVien.huyen" selected>Chọn quận huyện</option>
                                                    </select>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="phuong" class="form-label">Phường/xã:</label>
                                                    <select id="phuong" name="phuong" class="form-control">
                                                        <option value="@Model.nhanVien.phuong" selected>Chọn phường xã</option>
                                                    </select>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="taikhoan" class="form-label">
                                                        Tài khoản:
                                                    </label>
                                                    <input type="text" class="form-control" value="@Model.nhanVien.taikhoan" id="taikhoan" name="taikhoan">
                                                </div>
                                                <div class="mb-3">
                                                    <label for="gioitinh" class="form-label">Giới tính:</label>
                                                    <select id="gioitinh" name="gioitinh" class="form-control">
                                                        <option value="Nam" selected>Nam</option>
                                                        <option value="Nữ" selected>Nữ</option>
                                                    </select>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="taikhoan" class="form-label">
                                                        Số lần vi phạm:
                                                    </label>
                                                    <input type="number" class="form-control" value="@Model.nhanVien.solanvipham" id="solanvipham" name="solanvipham">
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="mb-3">
                                                    <label for="cccd" class="form-label">CCCD:</label>
                                                    <input type="text" class="form-control" value="@Model.nhanVien.cccd" id="cccd" name="cccd" required>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="ngaysinh" class="form-label">Ngày sinh:</label>
                                                    <input type="date" class="form-control" value="@Model.nhanVien.ngaysinh" id="ngaysinh" name="ngaysinh" required>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="image" class="form-label">Ảnh:</label>
                                                    @*                                                 <input type="text" class="form-control"  id="image" name="image" required>
                                                *@
                                                    <img src="@Model.nhanVien.image" style="margin-left: 250px; " width="300px" height="234px" alt="@Model.nhanVien.hovaten" id="image" name="image" />
                                                </div>
                                                <div class="mb-3">
                                                    <label for="idchucvu" class="form-label">Chức vụ:</label>
                                                    <select id="idchucvu" name="idchucvu" class="form-control">
                                                        @if (Model.listchucVu != null && Model.listchucVu.Count > 0)
                                                        {
                                                            foreach (var chucvu in Model.listchucVu)
                                                            {
                                                                <option value="@chucvu.id">@chucvu.tenchucvu</option>
                                                            }
                                                        }
                                                        else
                                                        {
                                                            <option value="" selected>Không có dữ liệu</option>
                                                        }
                                                    </select>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="idkhachsan" class="form-label">Khách sạn:</label>
                                                    <select id="idkhachsan" name="idkhachsan" class="form-control">
                                                        @if (Model.listKhachSan != null && Model.listKhachSan.Count > 0)
                                                        {
                                                            foreach (var khachsan in Model.listKhachSan)
                                                            {
                                                                <option value="@khachsan.id">@khachsan.tenkhachsan</option>
                                                            }
                                                        }
                                                        else
                                                        {
                                                            <option value="" selected>Không có dữ liệu</option>
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="submit" class="btn btn-primary custom-button">
                                                <i class="fas fa-save"></i> Lưu
                                            </button>
                                        </div>
                                    </form>
                                }
                                else
                                {
                                    <p>Không có dữ liệu</p>
                                }
                            </div>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@2.9.3/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
        crossorigin="anonymous"></script>
<script src="/static/custom.min.js"></script>
<script src="/static/jquery-3.2.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"></script>
<script>
    var citis = document.getElementById("tinh");
    var districts = document.getElementById("huyen");
    var wards = document.getElementById("phuong");
    var Parameter = {
        url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
        method: "GET",
        responseType: "application/json",
    };
    var promise = axios(Parameter);
    promise.then(function (result) {
        renderCity(result.data);
    });

    function renderCity(data) {
        for (const x of data) {
            var opt = document.createElement('option');
            opt.value = x.Name;
            opt.text = x.Name;
            opt.setAttribute('data-id', x.Id);
            citis.options.add(opt);
        }
        citis.onchange = function () {
            districts.length = 1;
            wards.length = 1;
            if (this.options[this.selectedIndex].dataset.id != "") {
                const result = data.filter(n => n.Id === this.options[this.selectedIndex].dataset.id);

                for (const k of result[0].Districts) {
                    var opt = document.createElement('option');
                    opt.value = k.Name;
                    opt.text = k.Name;
                    opt.setAttribute('data-id', k.Id);
                    districts.options.add(opt);
                }
            }
        };
        districts.onchange = function () {
            wards.length = 1;
            const dataCity = data.filter((n) => n.Id === citis.options[citis.selectedIndex].dataset.id);
            if (this.options[this.selectedIndex].dataset.id != "") {
                const dataWards = dataCity[0].Districts.filter(n => n.Id === this.options[this.selectedIndex].dataset.id)[0].Wards;

                for (const w of dataWards) {
                    var opt = document.createElement('option');
                    opt.value = w.Name;
                    opt.text = w.Name;
                    opt.setAttribute('data-id', w.Id);
                    wards.options.add(opt);
                }
            }
        };
    }
</script>





@if (TempData["xoathanhcong"] != null)
{
    <script>
        Swal.fire({
            position: "top-right",
            title: 'Xoá tầng thành công!',
            icon: "success",
            showConfirmButton: false,
        });
    </script>
}