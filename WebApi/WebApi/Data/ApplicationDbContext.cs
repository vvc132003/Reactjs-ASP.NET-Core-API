using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Data
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<ChatMessage> ChatMessages { get; set; }

        public DbSet<User> Users { get; set; }
        public DbSet<CuocHoiThoai> CuocHoiThoais { get; set; }
        public DbSet<NguoiThamGia> NguoiThamGias { get; set; }
        public DbSet<TinNhan> TinNhans { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define the relationships and configure cascade delete behavior

            modelBuilder.Entity<NguoiThamGia>()
                .HasOne(ng => ng.CuocHoiThoai)
                .WithMany(ch => ch.NguoiThamGias)
                .HasForeignKey(ng => ng.CuocHoiThoaiId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<NguoiThamGia>()
                .HasOne(ng => ng.NhanVienThamGia)
                .WithMany()
                .HasForeignKey(ng => ng.NhanVienThamGiaId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<TinNhan>()
                .HasOne(tn => tn.CuocHoiThoai)
                .WithMany(ch => ch.TinNhans)
                .HasForeignKey(tn => tn.CuocHoiThoaiId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<TinNhan>()
                .HasOne(tn => tn.NhanVienGui)
                .WithMany()
                .HasForeignKey(tn => tn.NhanVienGuiId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<CuocHoiThoai>()
                .HasOne(ch => ch.NhanVienTao)
                .WithMany(u => u.CuocHoiThoais)
                .HasForeignKey(ch => ch.NhanVienTaoId)
                .OnDelete(DeleteBehavior.NoAction);

            base.OnModelCreating(modelBuilder);
        }

    }
}
