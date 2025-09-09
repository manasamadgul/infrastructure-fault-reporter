using FaultReportingApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FaultReportingApi.Models;


namespace FaultReportingApi.Controllers
{

    /// <summary>
    /// API Controller for managing infrastructure fault reports
    /// Handles CRUD operations for fault reporting system
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]// Maps to /api/InfrastructureFaults
    public class InfrastructureFaultsController : ControllerBase
    {
        //Dependency injection of database context
        private readonly InfrastructureFaultDbContext _context;
        /// <summary>
        /// Constructor - injects database context for data operations
        /// </summary>
        private readonly ILogger<InfrastructureFaultsController> _logger;

        public InfrastructureFaultsController(InfrastructureFaultDbContext context, ILogger<InfrastructureFaultsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Create a new fault report
        /// POST: api/InfrastructureFaults
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<InfrastructureFault>> PostFault(InfrastructureFault fault)
        {
            fault.Id = Guid.NewGuid();
            fault.ReportedAt = DateTime.UtcNow;
            fault.Status = InfrastructureFault.StatusEnum.Open;
            _logger.LogInformation($"Creating new fault: {fault.FaultType}");

            // Add to database and save changes
            _context.InfrastructureFaults.Add(fault);
            await _context.SaveChangesAsync();
            _logger.LogInformation($"Fault created with ID: {fault.Id}");

            return CreatedAtAction(nameof(GetFault), new { id = fault.Id }, fault);
        }
        /// <summary>
        /// Retrieve all fault reports from database
        /// GET: api/InfrastructureFaults
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InfrastructureFault>>> GetFaults()
        {
            _logger.LogInformation("Getting all faults");
            var faults = await _context.InfrastructureFaults.ToListAsync();
            _logger.LogInformation($"Retrieved {faults.Count} faults");
            return faults;

        }
        /// <summary>
        /// Retrieve a specific fault report by ID
        /// GET: api/InfrastructureFaults/{id}
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<InfrastructureFault>> GetFault(Guid id)
        {
            var fault = await _context.InfrastructureFaults.FindAsync(id);
            return fault == null ? NotFound() : fault;
        }
        /// <summary>
        /// Delete an existing fault report
        /// DELETE: api/InfrastructureFaults/{id}
        /// NOTE: DELETE functionality is available in the backend API but not implemented 
        /// in the frontend interface as per project requirements
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFault(Guid id)
        {
            var fault = await _context.InfrastructureFaults.FindAsync(id);
            if (fault == null)
            {
                return NotFound();
            }

            _context.InfrastructureFaults.Remove(fault);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        /// <summary>
        /// Delete all fault reports from the database
        /// NOTE: DELETE functionality is available in the backend API but not implemented 
        /// in the frontend interface as per project requirements
        /// </summary>
        [HttpDelete]
        public async Task<IActionResult> DeleteAllFaults()
        {
            var faults = await _context.InfrastructureFaults.ToListAsync();
            _context.InfrastructureFaults.RemoveRange(faults);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}