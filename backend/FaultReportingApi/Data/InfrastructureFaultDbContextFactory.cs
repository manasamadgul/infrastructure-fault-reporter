//The factory tells the migration tool how to connect to the database.
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace FaultReportingApi.Data
{
    public class InfrastructureFaultDbContextFactory : IDesignTimeDbContextFactory<InfrastructureFaultDbContext>
    {
        public InfrastructureFaultDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<InfrastructureFaultDbContext>();
            optionsBuilder.UseSqlite("Data Source=faults.db");

            return new InfrastructureFaultDbContext(optionsBuilder.Options);
        }
    }
}
