using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Services
{
    public class UserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<User> GetUserByIdAsync(int id)
        {
            var user = await _context.Users
                                    .Where(u => u.id == id)
                                    .FirstOrDefaultAsync();
            return user;
        }

    }
}
