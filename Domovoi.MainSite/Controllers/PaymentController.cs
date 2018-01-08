using System.Collections.Generic;
using System.Linq;
using Domovoi.DAL.Data;
using Domovoi.DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace Domovoi.MainSite.Controllers
{
    [Produces("application/json")]
    public sealed class PaymentController : Controller
    {
        private readonly ApplicationDbContext _dbContext;

        public PaymentController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("api/consumer/{consumerId}/payment/{pageSize?}/{page?}")]
        public IEnumerable<Payment> GetServices(int idConsumer, int pageSize = 12, int page = 1)
        {
            return _dbContext.Payments
                .Where(o => o.Consumer.Id == idConsumer)
                .OrderByDescending(o => o.DateTime)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }

        [HttpGet]
        [Route("api/consumer/{consumerId}/paymentsCount")]
        public int ConsumerPaymentsCount(int consumerId)
        {
            return _dbContext.Payments.Count(o => o.Consumer.Id == consumerId);
        }
    }
}