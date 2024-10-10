using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models
{
    public class TinNhan
    {
        public int Id { get; set; }

        public int CuocHoiThoaiId { get; set; }

        public int NhanVienGuiId { get; set; }

        [Required]
        [StringLength(10)]
        public string LoaiTinNhan { get; set; }

        [Required]
        [StringLength(255)]
        public string Noidung { get; set; }

        public DateTime Duoctaovao { get; set; }

        public DateTime Daxoavao { get; set; }

        [ForeignKey("CuocHoiThoaiId")]
        public CuocHoiThoai CuocHoiThoai { get; set; }

        [ForeignKey("NhanVienGuiId")]
        public virtual User NhanVienGui { get; set; }
    }
    public class TinNhans
    {
      

        public int CuocHoiThoaiId { get; set; }
        public int NhanVienGuiId { get; set; }
        public string LoaiTinNhan { get; set; }
        public string Noidung { get; set; }

        public DateTime Duoctaovao { get; set; }

        public DateTime Daxoavao { get; set; }
    }
}
