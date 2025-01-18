using Microsoft.EntityFrameworkCore;
using ProductAPI.Models; // Ahol a `Product` modell található

namespace ProductAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
    }
}