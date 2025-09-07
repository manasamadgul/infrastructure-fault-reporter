using Microsoft.EntityFrameworkCore;
using FaultReportingApi.Models;

namespace FaultReportingApi.Data
{
    public class InfrastructureFaultDbContext : DbContext
    {
        public InfrastructureFaultDbContext(DbContextOptions options)
            : base(options)
        {
        }
        public DbSet<InfrastructureFault> InfrastructureFaults { get; set; }
    }
}