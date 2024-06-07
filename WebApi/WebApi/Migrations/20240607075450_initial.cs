using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChatMessages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    User = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatMessages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    firstname = table.Column<string>(name: "first_name", type: "nvarchar(max)", nullable: false),
                    lastname = table.Column<string>(name: "last_name", type: "nvarchar(max)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    avatar = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "CuocHoiThoais",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tieude = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    NhanVienTaoId = table.Column<int>(type: "int", nullable: false),
                    LoaiHoiThoai = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false),
                    Duoctaovao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Duoccaonhatvao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Daxoavao = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CuocHoiThoais", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CuocHoiThoais_Users_NhanVienTaoId",
                        column: x => x.NhanVienTaoId,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "NguoiThamGias",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CuocHoiThoaiId = table.Column<int>(type: "int", nullable: false),
                    NhanVienThamGiaId = table.Column<int>(type: "int", nullable: false),
                    Duoctaovao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Duoccapnhatvao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Userid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NguoiThamGias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NguoiThamGias_CuocHoiThoais_CuocHoiThoaiId",
                        column: x => x.CuocHoiThoaiId,
                        principalTable: "CuocHoiThoais",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_NguoiThamGias_Users_NhanVienThamGiaId",
                        column: x => x.NhanVienThamGiaId,
                        principalTable: "Users",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_NguoiThamGias_Users_Userid",
                        column: x => x.Userid,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "TinNhans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CuocHoiThoaiId = table.Column<int>(type: "int", nullable: false),
                    NhanVienGuiId = table.Column<int>(type: "int", nullable: false),
                    LoaiTinNhan = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Noidung = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Duoctaovao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Daxoavao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Userid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TinNhans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TinNhans_CuocHoiThoais_CuocHoiThoaiId",
                        column: x => x.CuocHoiThoaiId,
                        principalTable: "CuocHoiThoais",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TinNhans_Users_NhanVienGuiId",
                        column: x => x.NhanVienGuiId,
                        principalTable: "Users",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_TinNhans_Users_Userid",
                        column: x => x.Userid,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CuocHoiThoais_NhanVienTaoId",
                table: "CuocHoiThoais",
                column: "NhanVienTaoId");

            migrationBuilder.CreateIndex(
                name: "IX_NguoiThamGias_CuocHoiThoaiId",
                table: "NguoiThamGias",
                column: "CuocHoiThoaiId");

            migrationBuilder.CreateIndex(
                name: "IX_NguoiThamGias_NhanVienThamGiaId",
                table: "NguoiThamGias",
                column: "NhanVienThamGiaId");

            migrationBuilder.CreateIndex(
                name: "IX_NguoiThamGias_Userid",
                table: "NguoiThamGias",
                column: "Userid");

            migrationBuilder.CreateIndex(
                name: "IX_TinNhans_CuocHoiThoaiId",
                table: "TinNhans",
                column: "CuocHoiThoaiId");

            migrationBuilder.CreateIndex(
                name: "IX_TinNhans_NhanVienGuiId",
                table: "TinNhans",
                column: "NhanVienGuiId");

            migrationBuilder.CreateIndex(
                name: "IX_TinNhans_Userid",
                table: "TinNhans",
                column: "Userid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChatMessages");

            migrationBuilder.DropTable(
                name: "NguoiThamGias");

            migrationBuilder.DropTable(
                name: "TinNhans");

            migrationBuilder.DropTable(
                name: "CuocHoiThoais");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
