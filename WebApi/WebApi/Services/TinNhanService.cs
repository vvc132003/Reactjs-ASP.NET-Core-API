using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Services
{
    public class TinNhanService
    {
        private readonly ApplicationDbContext _context;

        public TinNhanService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<TinNhan>> GetTinNhanListAsync()
        {
            return await _context.TinNhans.ToListAsync();
        }

        public async Task<List<TinNhan>> GetTinNhanListByIdCuocTroChuyenAsync(int cuochoithoaiid)
        {
            return await _context.TinNhans
                .Where(tn => tn.CuocHoiThoaiId == cuochoithoaiid)
                .ToListAsync();
        }

        public async Task<TinNhan> GetTinNhanByIdAsync(int id)
        {
            return await _context.TinNhans.FindAsync(id);
        }

        public async Task<TinNhan> GetLatestTinNhanByIdCuocTroChuyenAsync(int cuochoithoaiid)
        {
            return await _context.TinNhans
                .Where(tn => tn.CuocHoiThoaiId == cuochoithoaiid)
                .OrderByDescending(tn => tn.Duoctaovao)
                .FirstOrDefaultAsync();
        }

        public async Task AddTinNhanAsync(TinNhan tinNhan)
        {
            _context.TinNhans.Add(tinNhan);
            await _context.SaveChangesAsync();
        }

        public async Task AddTinNhanAsync(int cuochoithoaiid, int nhanvienguiid, string noidung)
        {
            var tinNhan = new TinNhan
            {
                CuocHoiThoaiId = cuochoithoaiid,
                NhanVienGuiId = nhanvienguiid,
                LoaiTinNhan = "vip",
                Noidung = noidung,
                Duoctaovao = DateTime.Now,
                Daxoavao = DateTime.Now
            };

            _context.TinNhans.Add(tinNhan);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTinNhanAsync(TinNhan tinNhan)
        {
            _context.Entry(tinNhan).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTinNhanAsync(int id)
        {
            var tinNhan = await _context.TinNhans.FindAsync(id);
            if (tinNhan != null)
            {
                _context.TinNhans.Remove(tinNhan);
                await _context.SaveChangesAsync();
            }
        }
    }
}
