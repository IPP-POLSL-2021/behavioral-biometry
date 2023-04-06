using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<testModel> testModel { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<AccessTokens> accessTokens { get; set; }
    }
}
