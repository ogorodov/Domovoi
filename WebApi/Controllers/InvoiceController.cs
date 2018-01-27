using System.Collections.Generic;
using System.Linq;
using Domovoi.DAL.Data;
using Domovoi.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Domovoi.WebApi.Controllers
{
    [Produces("application/json")]
    public sealed class InvoiceController : Controller
    {
        private readonly ApplicationDbContext _dbContext;

        public InvoiceController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("api/consumer/{consumerId}/invoice/{pageSize?}/{page?}")]
        public IEnumerable<Invoice> GetForConsumer(int consumerId, int pageSize = 12, int page = 1)
        {
            return _dbContext.Invoices
                .Include(o => o.Items)
                .ThenInclude(o => o.ServicePrice)
                .ThenInclude(o => o.Service)
                .Where(o => o.Consumer.Id == consumerId)
                .OrderByDescending(o => o.Date)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToArray();
        }

        [HttpGet]
        [Route("api/consumer/{consumerId}/invoice/Count")]
        public int ConsumerInvoiceCount(int consumerId)
        {
            return _dbContext.Invoices.Count(o => o.Consumer.Id == consumerId);
        }
    }
}