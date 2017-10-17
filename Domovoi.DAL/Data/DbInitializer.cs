using System;
using System.Collections.Generic;
using System.Linq;
using Domovoi.DAL.Models;

namespace Domovoi.DAL.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext dbContext)
        {
            if (!dbContext.Consumers.Any())
                dbContext.Consumers.AddRange(
                    new Consumer {FirstName = "Константин", MiddleName = "Сергеевич", LastName = "Огородов"},
                    new Consumer {FirstName = "Анна", MiddleName = "Владимировна", LastName = "Огородова"});

            if (!dbContext.Services.Any())
            {
                var services = new[]
                {
                    new Service
                    {
                        Name = "Текущий ремонт жилфонда",
                        Prices = new List<ServicePrice>
                        {
                            new ServicePrice {StartDate = new DateTime(2000, 01, 01), EndDate = new DateTime(2004, 12, 01)},
                            new ServicePrice {StartDate = new DateTime(2005, 01, 01), EndDate = new DateTime(2009, 12, 01)},
                            new ServicePrice {StartDate = new DateTime(2010, 01, 01), EndDate = new DateTime(2014, 12, 01)},
                            new ServicePrice {StartDate = new DateTime(2015, 01, 01)}
                        }
                    },
                    new Service
                    {
                        Name = "Антена",
                        Prices = new List<ServicePrice>
                        {
                            new ServicePrice {StartDate = new DateTime(2015, 01, 01)}
                        }
                    },
                    new Service
                    {
                        Name = "Уборка",
                        Prices = new List<ServicePrice>
                        {
                            new ServicePrice {StartDate = new DateTime(2011, 01, 01), EndDate = new DateTime(2014, 06, 01)},
                            new ServicePrice {StartDate = new DateTime(2014, 07, 01)}
                        }
                    }
                };

                foreach (var service in services)
                foreach (var servicePrice in service.Prices)
                    servicePrice.Service = service;

                dbContext.AddRange(services);
            }

            dbContext.SaveChanges();
        }
    }
}