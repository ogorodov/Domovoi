using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domovoi.DAL.Data;
using Domovoi.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Domovoi.MainSite.Controllers
{
    [Produces("application/json")]
    [Route("api/Services")]
    public class ServicesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ServicesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Services
        [HttpGet]
        public IEnumerable<Service> GetServices()
        {
            return _context.Services
                .Include(o => o.Prices)
                .ToArray();
        }

        // GET: api/Services/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetService([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var service = await _context.Services.SingleOrDefaultAsync(m => m.Id == id);

            if (service == null)
                return NotFound();

            return Ok(service);
        }

        // PUT: api/Services/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutService([FromRoute] int id, [FromBody] Service service)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != service.Id)
                return BadRequest();

            _context.Entry(service).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/Services
        [HttpPost]
        public async Task<IActionResult> PostService([FromBody] Service service)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Services.Add(service);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetService", new {id = service.Id}, service);
        }

        // DELETE: api/Services/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteService([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var service = await _context.Services.SingleOrDefaultAsync(m => m.Id == id);
            if (service == null)
                return NotFound();

            _context.Services.Remove(service);
            await _context.SaveChangesAsync();

            return Ok(service);
        }

        private bool ServiceExists(int id)
        {
            return _context.Services.Any(e => e.Id == id);
        }
    }
}