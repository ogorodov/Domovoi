using System;
using System.Collections.Generic;
using System.Linq;
using Domovoi.DAL.Data;
using Domovoi.DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace Domovoi.WebApi.Controllers
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
        public IEnumerable<Payment> Get(int consumerId, int pageSize = 12, int page = 1)
        {
            throw new NotImplementedException();

            //var t =  _dbContext.Payments
            //    .Where(o => o.Consumer.Id == consumerId)
            //    .OrderByDescending(o => o.DateTime)
            //    .Skip((page - 1) * pageSize)
            //    .Take(pageSize)
            //    .ToArray();

            //return t;
        }

        [HttpGet]
        [Route("api/consumer/{consumerId}/payment/Count")]
        public int ConsumerPaymentsCount(int consumerId)
        {
            throw new NotImplementedException();
            //return _dbContext.Payments.Count(o => o.Consumer.Id == consumerId);
        }

        [HttpPost]
        [Route("api/consumer/{consumerId}/payment/add")]
        public void Post(int consumerId, [FromBody] Payment payment)
        {
            _dbContext.Payments.Add(payment);
            _dbContext.SaveChanges();
        }
    }
}