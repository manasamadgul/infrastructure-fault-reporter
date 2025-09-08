// Design-time factory for Entity Framework migrations
// The factory tells the migration tool how to connect to the database
// when running commands like 'dotnet ef migrations add' or 'dotnet ef database update'
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace FaultReportingApi.Data
{
    /// <summary>
    /// Factory class required for EF Core design-time operations
    /// Provides database context configuration during migrations
    /// </summary>
    public class InfrastructureFaultDbContextFactory : IDesignTimeDbContextFactory<InfrastructureFaultDbContext>
    {
        public InfrastructureFaultDbContext CreateDbContext(string[] args)
        {
            // Configure options for SQLite database
            var optionsBuilder = new DbContextOptionsBuilder<InfrastructureFaultDbContext>();
            optionsBuilder.UseSqlite("Data Source=faults.db");
            //returns Configured DbContext for SQLite database
            return new InfrastructureFaultDbContext(optionsBuilder.Options);
        }
    }
}
