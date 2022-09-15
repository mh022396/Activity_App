using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) // like calling super(options)
        {

        }

        public DbSet<Activity> Activities {get; set;}
    }
}