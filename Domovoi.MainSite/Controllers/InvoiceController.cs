using System.Collections.Generic;
using System.Linq;
using Domovoi.DAL.Data;
using Domovoi.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Domovoi.MainSite.Controllers
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
        [Route("api/consumer/{consumerId}/invoice")]
        public IEnumerable<Invoice> GetForConsumer(int consumerId)
        {
            return _dbContext.Invoices
                .Include(o=>o.Items)
                .Where(o => o.Consumer.Id == consumerId).ToArray();
        }
    }
}