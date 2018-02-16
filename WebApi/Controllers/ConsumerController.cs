using System;
using System.Collections.Generic;
using System.Linq;
using Domovoi.DAL.Data;
using Domovoi.DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace Domovoi.WebApi.Controllers
{
    public sealed class ConsumerController : Controller
    {
        private readonly ApplicationDbContext _dbContext;

        public ConsumerController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("api/[controller]")]
        public IEnumerable<Consumer> Get()
        {
            return _dbContext.Consumers.ToArray();
        }

        [HttpGet("{id}")]
        [Route("api/[controller]/{id}")]
        public Consumer Get(int id)
        {
            return _dbContext.Consumers.SingleOrDefault(o => o.Id == id);
        }

        [HttpGet]
        [Route("api/[controller]/{consumerId}/Calculate")]
        public void Calculate(int consumerId)
        {
            throw new NotImplementedException();
            //var consumer = _dbContext.Consumers.Single(o => o.Id == consumerId);
            //var startDate = _dbContext.Invoices.Where(o => o.Consumer.Id == consumerId).DefaultIfEmpty().Max(o => o.Date);

            //if (startDate == DateTime.MinValue)
            //    startDate = consumer.JoinDate.AddDays(1 - consumer.JoinDate.Day);

            //var endDate = DateTime.Now.Date;
            //endDate = endDate.AddDays(1 - endDate.Day);

            //if (endDate <= startDate)
            //    return;

            //var totalMonths = (endDate.Year - startDate.Year) * 12 + (endDate.Month - startDate.Month);

            //var servicePrices = _dbContext.ServicePrices.Where(o =>
            //    o.StartDate <= endDate && (o.EndDate >= startDate || !o.EndDate.HasValue)).ToArray();

            //var invoices = new List<Invoice>(totalMonths);

            //for (var i = 0; i < totalMonths; i++)
            //{
            //    var invoice = new Invoice
            //    {
            //        Consumer = consumer,
            //        Date = startDate.AddMonths(i)
            //    };

            //    invoice.Items = servicePrices.Where(o => o.StartDate <= invoice.Date && (!o.EndDate.HasValue || o.EndDate >= invoice.Date))
            //        .Select(o => new InvoiceItem {Invoice = invoice, ServicePrice = o, Quantity = 1}).ToList();

            //    if (invoice.Items.Count > 0)
            //        invoices.Add(invoice);
            //}

            //_dbContext.Invoices.AddRange(invoices);
            //_dbContext.SaveChanges();
        }


        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //    throw new NotImplementedException();
        //}

        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //    throw new NotImplementedException();
        //}

        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //    throw new NotImplementedException();
        //}
    }
}