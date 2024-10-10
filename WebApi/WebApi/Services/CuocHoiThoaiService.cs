using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Services
{
    public class CuocHoiThoaiService
    {
        private readonly ApplicationDbContext _context;

        public CuocHoiThoaiService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CuocHoiThoai> GetLatestCuocHoiThoaiAsync(int idusserlogin)
        {
            return await _context.CuocHoiThoais
                .Where(ch => ch.NguoiThamGias.Any(nt => nt.NhanVienThamGiaId == idusserlogin))
                .OrderByDescending(ch => ch.Duoctaovao)
                .FirstOrDefaultAsync();
        }
        public async Task<List<CuocHoiThoai>> GetCuocHoiThoaiListAsync()
        {
            return await _context.CuocHoiThoais.ToListAsync();
        }

        public async Task<int> GetConversationCountAsync(int nhanVienHienTai, int nhanVienDuocChon)
        {
            return await _context.CuocHoiThoais
                .Where(ch => ch.NguoiThamGias.Any(nt => nt.NhanVienThamGiaId == nhanVienHienTai) &&
                             ch.NguoiThamGias.Any(nt => nt.NhanVienThamGiaId == nhanVienDuocChon) &&
                             ch.LoaiHoiThoai == "1-1")
                .CountAsync();
        }

        public async Task<List<CuocHoiThoai>> GetCuocHoiThoaiListByIdAsync(int nhanVienThamGiaId)
        {
            return await _context.CuocHoiThoais
                .Where(ch => ch.NguoiThamGias.Any(nt => nt.NhanVienThamGiaId == nhanVienThamGiaId))
                .OrderByDescending(ch => ch.Duoctaovao)
                .ToListAsync();
        }

        public async Task<CuocHoiThoai> GetCuocHoiThoaiByIdAsync(int id)
        {
            return await _context.CuocHoiThoais.FindAsync(id);
        }

        public async Task AddCuocHoiThoaiAsync(CuocHoiThoai cuocHoiThoai)
        {
            _context.CuocHoiThoais.Add(cuocHoiThoai);
            await _context.SaveChangesAsync();
        }

        public async Task<int> AddCuocHoiThoaiByidAsync(CuocHoiThoai cuocHoiThoai)
        {
            _context.CuocHoiThoais.Add(cuocHoiThoai);
            await _context.SaveChangesAsync();
            return cuocHoiThoai.Id;
        }

        public async Task UpdateCuocHoiThoaiAsync(CuocHoiThoai cuocHoiThoai)
        {
            _context.Entry(cuocHoiThoai).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }


        public async Task DeleteCuocHoiThoaiAsync(int id)
        {
            var cuocHoiThoai = await _context.CuocHoiThoais.FindAsync(id);
            if (cuocHoiThoai != null)
            {
                _context.CuocHoiThoais.Remove(cuocHoiThoai);
                await _context.SaveChangesAsync();
            }
        }


        public async Task<List<CuocHoiThoai>> TimKiemTheoTieuDeHoacTenUserAsync(string tuKhoa)
        {
            // Sử dụng LINQ để truy vấn các cuộc hội thoại có tiêu đề chứa từ khóa tìm kiếm
            var cuocHoiThoais = await _context.CuocHoiThoais
                .Where(c => c.Tieude.Contains(tuKhoa) || c.NhanVienTao.first_name.Contains(tuKhoa))
                .ToListAsync();

            // Trả về danh sách các cuộc hội thoại tìm được
            return cuocHoiThoais;
        }
    }
}