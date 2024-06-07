using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace WebApi.Models
{
    public class CuocHoiThoai
    {
        public int Id { get; set; }

        [Required]
        [StringLength(40)]
        public string Tieude { get; set; }

        public int NhanVienTaoId { get; set; }

        [Required]
        [StringLength(45)]
        public string LoaiHoiThoai { get; set; }

        public DateTime Duoctaovao { get; set; }

        public DateTime Duoccaonhatvao { get; set; }

        public DateTime Daxoavao { get; set; }

        [ForeignKey("NhanVienTaoId")]
        public virtual User NhanVienTao { get; set; }

        public virtual ICollection<NguoiThamGia> NguoiThamGias { get; set; }

        public virtual ICollection<TinNhan> TinNhans { get; set; }
    }
}
