using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Services
{
    public class NguoiThamGiaService
    {
        private readonly ApplicationDbContext _context;

        public NguoiThamGiaService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<NguoiThamGia>> GetNguoiThamGiaListAsync()
        {
            return await _context.NguoiThamGias.ToListAsync();
        }

        public async Task<List<NguoiThamGia>> GetNguoiThamGiaListByIdAsync(int cuocHoiThoaiId)
        {
            return await _context.NguoiThamGias
                .Where(ntg => ntg.CuocHoiThoaiId == cuocHoiThoaiId)
                .ToListAsync();
        }

        public async Task<NguoiThamGia> GetNguoiThamGiaByIdAsync(int id)
        {
            return await _context.NguoiThamGias.FindAsync(id);
        }

        public async Task AddNguoiThamGiaAsync(NguoiThamGia nguoiThamGia)
        {
            _context.NguoiThamGias.Add(nguoiThamGia);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateNguoiThamGiaAsync(NguoiThamGia nguoiThamGia)
        {
            _context.Entry(nguoiThamGia).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteNguoiThamGiaAsync(int id)
        {
            var nguoiThamGia = await _context.NguoiThamGias.FindAsync(id);
            if (nguoiThamGia != null)
            {
                _context.NguoiThamGias.Remove(nguoiThamGia);
                await _context.SaveChangesAsync();
            }
        }
    }
}
