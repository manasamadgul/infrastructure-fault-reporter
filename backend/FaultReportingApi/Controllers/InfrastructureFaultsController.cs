using FaultReportingApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FaultReportingApi.Models;


namespace FaultReportingApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InfrastructureFaultsController : ControllerBase
    {
        private readonly InfrastructureFaultDbContext _context;
        public InfrastructureFaultsController(InfrastructureFaultDbContext context)
        {
            _context = context;
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("API is working");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InfrastructureFault>> GetFault(Guid id)
        {
            var fault = await _context.InfrastructureFaults.FindAsync(id);
            return fault == null ? NotFound() : fault;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InfrastructureFault>>> GetFaults()
        {
            return await _context.InfrastructureFaults.ToListAsync();
        }
        
        [HttpPost]
        public async Task<ActionResult<InfrastructureFault>> PostFault(InfrastructureFault fault)
        {
            fault.Id = Guid.NewGuid();
            fault.ReportedAt = DateTime.UtcNow;
            fault.Status = InfrastructureFault.StatusEnum.Open;

            _context.InfrastructureFaults.Add(fault);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFault), new { id = fault.Id }, fault);
        }

    }
}