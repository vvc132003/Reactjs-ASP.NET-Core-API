using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class CuocHoiThoaiModel
    {
        public int Id { get; set; }

        public string Tieude { get; set; }

        public int NhanVienTaoId { get; set; }

        public string LoaiHoiThoai { get; set; }

        public DateTime Duoctaovao { get; set; }

        public DateTime Duoccaonhatvao { get; set; }

        public DateTime Daxoavao { get; set; }

    }
}
