using System;
using System.Collections.Generic;
using System.Linq;
using Domovoi.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Domovoi.DAL.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext dbContext)
        {
            using (dbContext)
            {
                dbContext.Database.OpenConnection();

                if (!dbContext.Consumers.Any())
                    dbContext.Consumers.AddRange(
                        new Consumer {FirstName = "Константин", MiddleName = "Сергеевич", LastName = "Огородов", JoinDate = new DateTime(1981, 6, 10)},
                        new Consumer {FirstName = "Анна", MiddleName = "Владимировна", LastName = "Огородова", JoinDate = new DateTime(1983, 8, 21)});

                /****************************************************************************************************
                 * Organisation
                 ****************************************************************************************************/
                var organisationNames = new[] {"ООО Рога и Копыта", "Другая организация"};
                Organisation[] organisations;
                if (!dbContext.Organisations.Any())
                {
                    organisations = organisationNames.Select(o => new Organisation {Name = o}).ToArray();
                    dbContext.Organisations.AddRange(organisations);
                }
                else
                {
                    organisations = dbContext.Organisations.Where(o => organisationNames.Contains(o.Name)).ToArray();
                }

                /****************************************************************************************************
                 * HousingObject
                 ****************************************************************************************************/
                var housingObjectNotes = new[] {"Дом_1", "Дом_2", "Дом_3", "Дом_4", "Дом_5"};
                HousingObject[] housingObjects;
                if (!dbContext.HousingObjects.Any())
                {
                    housingObjects = housingObjectNotes.Select(o => new HousingObject {Notes = o}).ToArray();
                    dbContext.HousingObjects.AddRange(housingObjects);
                }
                else
                {
                    housingObjects = dbContext.HousingObjects.Where(o => housingObjectNotes.Contains(o.Notes)).ToArray();
                }

                dbContext.SaveChanges();

                /****************************************************************************************************
                 * OrganizationHousingObject
                 ****************************************************************************************************/
                if (!dbContext.OrganizationHousingObjects.Any())
                {
                    foreach (var org in organisations)
                    {
                        var i = 1;
                        foreach (var housingObject in housingObjects)
                        {
                            if (!(org.Id % 2 == 0 && housingObject.Id % 2 == 0))
                                dbContext.OrganizationHousingObjects.Add(
                                    new OrganizationHousingObject {Organisation = org, HousingObject = housingObject, JoinDate = DateTime.Now.AddYears(-i)});
                            i++;
                        }
                    }
                }

                /****************************************************************************************************
                 * Service
                 ****************************************************************************************************/
                if (!dbContext.Services.Any())
                {
                    var services = new[]
                    {
                        new Service
                        {
                            Organisation = organisations[0],
                            Name = "Текущий ремонт жилфонда",
                            Prices = new List<ServicePrice>
                            {
                                new ServicePrice {StartDate = new DateTime(2000, 01, 01), EndDate = new DateTime(2004, 12, 01), Price = 100},
                                new ServicePrice {StartDate = new DateTime(2005, 01, 01), EndDate = new DateTime(2009, 12, 01), Price = 200},
                                new ServicePrice {StartDate = new DateTime(2010, 01, 01), EndDate = new DateTime(2014, 12, 01), Price = 300},
                                new ServicePrice {StartDate = new DateTime(2015, 01, 01), Price = 400}
                            }
                        },
                        new Service
                        {
                            Organisation = organisations[0],
                            Name = "Антена",
                            Prices = new List<ServicePrice>
                            {
                                new ServicePrice {StartDate = new DateTime(2015, 01, 01), Price = 50}
                            }
                        },
                        new Service
                        {
                            Organisation = organisations[0],
                            Name = "Уборка",
                            Prices = new List<ServicePrice>
                            {
                                new ServicePrice {StartDate = new DateTime(2011, 01, 01), EndDate = new DateTime(2014, 06, 01), Price = 120},
                                new ServicePrice {StartDate = new DateTime(2014, 07, 01), Price = 180}
                            }
                        }
                    };

                    foreach (var service in services)
                    foreach (var servicePrice in service.Prices)
                        servicePrice.Service = service;

                    dbContext.AddRange(services);
                }

                dbContext.SaveChanges();
                dbContext.Database.CloseConnection();
            }
        }
    }
}