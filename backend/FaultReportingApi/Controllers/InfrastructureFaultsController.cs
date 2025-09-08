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
        public InfrastructureFaultsController(InfrastructureFaultDbContext context)
        {
            _context = context;
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

            // Add to database and save changes
            _context.InfrastructureFaults.Add(fault);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFault), new { id = fault.Id }, fault);
        }
        /// <summary>
        /// Retrieve all fault reports from database
        /// GET: api/InfrastructureFaults
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InfrastructureFault>>> GetFaults()
        {
            return await _context.InfrastructureFaults.ToListAsync();
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
        /// </summary>
        /// <returns></returns>
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