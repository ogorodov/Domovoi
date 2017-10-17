﻿using System.Collections.Generic;
using System.Linq;
using Domovoi.DAL.Data;
using Domovoi.DAL.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Domovoi.MainSite.Controllers
{
    [Route("api/[controller]")]
    public sealed class ConsumerController : Controller
    {
        private readonly ApplicationDbContext _dbContext;

        public ConsumerController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Consumer> Get()
        {
            var a = _dbContext.Consumers.ToArray();
            return a;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}