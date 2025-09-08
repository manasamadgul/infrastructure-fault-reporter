using Microsoft.EntityFrameworkCore;
using FaultReportingApi.Models;

namespace FaultReportingApi.Data
{
    /// <summary>
    /// Database context for managing infrastructure fault data using Entity Framework Core
    /// Handles database operations and entity mapping for the fault reporting system
    /// </summary>

    public class InfrastructureFaultDbContext : DbContext
    {
        /// <summary>
        /// Constructor that accepts DbContext options for dependency injection
        /// Options include database provider, connection string, and other configurations
        /// </summary>
        /// <param name="options">Database context configuration options</param>
        public InfrastructureFaultDbContext(DbContextOptions options)
            : base(options)
        {
        }
        /// <summary>
        /// DbSet representing the InfrastructureFaults table in the database
        /// Provides CRUD operations for fault reports through Entity Framework
        /// </summary>
        public DbSet<InfrastructureFault> InfrastructureFaults { get; set; }
    }
}