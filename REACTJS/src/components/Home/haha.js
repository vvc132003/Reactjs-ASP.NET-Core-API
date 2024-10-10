// @model List < Model.Models.Modeldata >
//     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
//         integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
//         <link rel='stylesheet'
//             href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>
//             <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">

//                 <link href="~/content/static/morris.css" rel="stylesheet" />
//                 <link href="~/content/static/c3.min.css" rel="stylesheet" />
//                 <link href="~/content/static/style.css" rel="stylesheet" />
//                 <link href="~/content/static/dashboard1.css" rel="stylesheet" />
//                 <link href="~/content/static/index.css" rel="stylesheet" />

//                 <div class="skin-default-dark fixed-layout">
//                     <div id="main-wrapper">
//                         @Html.Partial("~/Views/layout/navbar.cshtml")
//                         @Html.Partial("~/Views/layout/header.cshtml")
//                         <br />
//                         <div class="page-wrapper">
//                             <div class="container-fluid">
//                                 <div class="text-bg-success p-2">Nhận phòng</div>
//                                 <div class="border border-secondary-subtle" style="padding:10px 20px">
//                     @if (Model != null && Model.Count > 0)
//                                     {
//                                         foreach(var datphong in Model)
//                                     {
//                                         <form method="post" Action="/NhanPhong/CheckInNhanPhongOnline">

//                                             <input type="hidden" name="idphong" id="idphong" value="@datphong.datPhong.idphong" class="form-control" />
//                                             <div class="mb-3">
//                                                 <label for="hovaten" class="form-label">Tên khách hàng:</label>
//                                                 <input type="text" name="hovaten" id="hovaten" value="@datphong.datPhong.hovaten" class="form-control" disabled />
//                                             </div>
//                                             <div class="mb-3">
//                                                 <label for="email" class="form-label">Email:</label>
//                                                 <input type="text" name="email" value="@datphong.khachhang.email" id="email" class="form-control" disabled />
//                                             </div>
//                                             <div class="mb-3">
//                                                 <label for="sodienthoai" class="form-label">Số điện thoại:</label>
//                                                 <input type="text" name="sodienthoai" value="@datphong.khachhang.sodienthoai" id="sodienthoai" class="form-control" disabled />
//                                             </div>
//                                             <div class="mb-3">
//                                                 <label for="cccd" class="form-label">CCCD:</label>
//                                                 <input type="text" name="cccd" value="@datphong.khachhang.cccd" id="cccd" class="form-control" disabled />
//                                             </div>
//                                             <div class="modal-footer">
//                                                 <input type="submit" value="Nhận" class="btn btn-primary custom-button" />
//                                             </div>
//                                         </form>
//                                     }
//                     }
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
//                 <script src="https://cdn.jsdelivr.net/npm/popper.js@2.9.3/dist/umd/popper.min.js"></script>
//                 <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
//                     integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
//                     crossorigin="anonymous"></script>
//                 @* <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
//                 *@<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>
//                 <script src="/static/custom.min.js"></script>
//                 <script src="/static/jquery-3.2.1.min.js"></script>
//                 @if (TempData["themthanhcong"] != null)
//                 {
//                     <script>
//                         Swal.fire({
//                             position: "top-right",
//                         title: 'Thêm bộ phận thành công!',
//                         icon: "success",
//                         showConfirmButton: false,
//         });
//                     </script>
//                 }

//                 @if (TempData["xoathanhcong"] != null)
//                 {
//                     <script>
//                         Swal.fire({
//                             position: "top-right",
//                         title: 'Xoá chức vụ thành công!',
//                         icon: "success",
//                         showConfirmButton: false,
//         });
//                     </script>
//                 }




//                 System.Data.SqlClient.SqlException: 'The parameterized query '(@hovaten nvarchar(4000),@sodienthoai nvarchar(6),@email nvarcha' expects the parameter '@hovaten', which was not supplied.'