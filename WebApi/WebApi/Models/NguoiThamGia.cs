using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models
{
    public class NguoiThamGia
    {
        [Key]
        public int Id { get; set; }

        public int CuocHoiThoaiId { get; set; }

        public int NhanVienThamGiaId { get; set; }

        public DateTime Duoctaovao { get; set; }

        public DateTime Duoccapnhatvao { get; set; }

        [ForeignKey("CuocHoiThoaiId")]
        public CuocHoiThoai CuocHoiThoai { get; set; }

        [ForeignKey("NhanVienThamGiaId")]
        public virtual User NhanVienThamGia { get; set; }
    }
}
