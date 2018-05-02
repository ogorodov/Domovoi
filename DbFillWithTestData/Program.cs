using System;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using Dapper.Contrib.Extensions;
using Domovoi.Domain;

namespace Domovoi.DbFillWithTestData
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var connectionString =
                args.FirstOrDefault()
                ?? "Data Source=.\\SQLEXPRESS;Initial Catalog=Domovoi;Integrated Security=True";

            using (var connection = new SqlConnection(connectionString))
            {
                if (!connection.GetAll<Consumer>().Any())
                {
                    connection.Insert(new Consumer {FirstName = "Константин", MiddleName = "Сергеевич", LastName = "Огородов", JoinDate = new DateTime(1981, 6, 10)});
                    connection.Insert(new Consumer {FirstName = "Анна", MiddleName = "Владимировна", LastName = "Огородова", JoinDate = new DateTime(1983, 8, 21)});
                }

                /****************************************************************************************************
                 * Organisation
                 ****************************************************************************************************/
                var organisationNames = new[] {"ООО Рога и Копыта", "Другая организация"};
                if (connection.ExecuteScalar<int>("SELECT Count(*) FROM [Organisations]") < 1)
                    foreach (var organisationName in organisationNames)
                        connection.Execute("INSERT INTO [Organisations] ([Name]) VALUES (@Name)", new {Name = organisationName});
                var organisations = connection.GetAll<Organisation>().Where(o => organisationNames.Contains(o.Name)).ToArray();

                /****************************************************************************************************
                 * HousingObject
                 ****************************************************************************************************/
                var housingObjectNotes = new[] {"Дом_1", "Дом_2", "Дом_3", "Дом_4", "Дом_5"};
                if (connection.ExecuteScalar<int>("SELECT Count(*) FROM [HousingObjects]") < 1)
                    foreach (var housingObjectNote in housingObjectNotes)
                        connection.Execute("INSERT INTO [HousingObjects] ([Note]) VALUES (@Note)", new {Note = housingObjectNote});
                var housingObjects = connection.GetAll<HousingObject>().Where(o => housingObjectNotes.Contains(o.Note)).ToArray();

                /****************************************************************************************************
                 * OrganizationHousingObject
                 ****************************************************************************************************/
                if (connection.ExecuteScalar<int>("SELECT Count(*) FROM [OrganisationHousingObjects]") < 1)
                    foreach (var organisation in organisations)
                    {
                        var i = 1;
                        foreach (var housingObject in housingObjects)
                        {
                            if (!(organisation.Id % 2 == 0 && housingObject.Id % 2 == 0))
                                connection.Execute(
                                    "INSERT INTO [OrganisationHousingObjects] ([OrganisationId], [HousingObjectId], [JoinDate]) VALUES (@OrganisationId, @HousingObjectId, @JoinDate);",
                                    new {OrganisationId = organisation.Id, HousingObjectId = housingObject.Id, JoinDate = DateTime.Now.AddYears(-i)});
                            i++;
                        }
                    }

                /****************************************************************************************************
                 * Service
                 ****************************************************************************************************/
                var services = new[]
                {
                    new Service {Name = "Текущий ремонт жилфонда", Organisation = organisations[0], IsCompulsory = true},
                    new Service {Name = "Вывоз мусора", Organisation = organisations[0], IsCompulsory = true},
                    new Service {Name = "{Хрен бы знал что ещё", Organisation = organisations[0], IsCompulsory = true},
                    new Service {Name = "Коньсерж", Organisation = organisations[0], IsCompulsory = false},
                    new Service {Name = "Уборка", Organisation = organisations[1], IsCompulsory = true},
                    new Service {Name = "Антена", Organisation = organisations[1], IsCompulsory = false},
                    new Service {Name = "Интернет", Organisation = organisations[1], IsCompulsory = false},
                    new Service {Name = "Цифровое ТВ", Organisation = organisations[1], IsCompulsory = false}
                };

                if (connection.ExecuteScalar<int>("SELECT Count(*) FROM [Services]") < 1)
                    foreach (var service in services)
                        connection.Execute("INSERT INTO [Services] (OrganisationId, Name, IsCompulsory) VALUES (@OrganisationId, @Name, @IsCompulsory)",
                            new {OrganisationId = service.Organisation.Id, service.Name, service.IsCompulsory});

                services = connection.GetAll<Service>().Where(o => services.Select(s => s.Name).Contains(o.Name)).ToArray();

                /****************************************************************************************************
                 * ServicePrice
                 ****************************************************************************************************/
                if (connection.ExecuteScalar<int>("SELECT Count(*) FROM [ServicePrices]") < 1)
                {
                    var now = DateTime.Now.Date;
                    for (var i = 0; i < services.Length; i++)
                    for (var j = i; j >= 0; j--)
                        connection.Execute("INSERT INTO ServicePrices (ServiceId, StartMonth, EndMonth, Price) VALUES (@ServiceId,@StartMonth,@EndMonth,@Price)",
                            new {ServiceId = services[i].Id, StartMonth = now.Months() - (j + 1) * 3, EndMonth = j == 0 ? (int?) null : now.Months() - 1 - j * 3, Price = 100 * i - 10 * j + 15});
                }

                /****************************************************************************************************
                 * Payments
                 ****************************************************************************************************/
                if (connection.ExecuteScalar<int>("SELECT Count(*) FROM [Payments]") < 1)
                {
                    var now = DateTime.Now;
                    for (var i = 0; i < housingObjects.Length; i++)
                        if (i % 2 == 0)
                            for (var j = i; j >= 0; j--)
                                connection.Execute("INSERT INTO [Payments] (HousingObjectId, Amount, DateTime) VALUES (@HousingObjectId, @Amount, @DateTime)",
                                    new {HousingObjectId = housingObjects[i].Id, Amount = (i - j) * 1100 + 10, DateTime = now.AddMonths(-j)});
                }

                var payments = connection.GetAll<Payment>().Where(p => housingObjects.Select(o => o.Id).Contains(p.HousingObjectId)).ToArray();

                /****************************************************************************************************
                 * InvoicePayments
                 ****************************************************************************************************/
                if (connection.ExecuteScalar<int>("SELECT Count(*) FROM [InvoicePayments]") < 1)
                    foreach (var payment in payments)
                        connection.Execute("INSERT INTO [InvoicePayments] ([PaymentId], [Amount]) VALUES(@PaymentId, @Amount)",
                            new {PaymentId = payment.Id, payment.Amount});


                //{
                //    var services = new[]
                //    {
                //        new Service
                //        {
                //            Organisation = organisations[0],
                //            Name = "Текущий ремонт жилфонда",
                //            Prices = new List<ServicePrice>
                //            {
                //                new ServicePrice {StartDate = new DateTime(2000, 01, 01), EndDate = new DateTime(2004, 12, 01), Price = 100},
                //                new ServicePrice {StartDate = new DateTime(2005, 01, 01), EndDate = new DateTime(2009, 12, 01), Price = 200},
                //                new ServicePrice {StartDate = new DateTime(2010, 01, 01), EndDate = new DateTime(2014, 12, 01), Price = 300},
                //                new ServicePrice {StartDate = new DateTime(2015, 01, 01), Price = 400}
                //            }
                //        },
                //        new Service
                //        {
                //            Organisation = organisations[0],
                //            Name = "Антена",
                //            Prices = new List<ServicePrice>
                //            {
                //                new ServicePrice {StartDate = new DateTime(2015, 01, 01), Price = 50}
                //            }
                //        },
                //        new Service
                //        {
                //            Organisation = organisations[0],
                //            Name = "Уборка",
                //            Prices = new List<ServicePrice>
                //            {
                //                new ServicePrice {StartDate = new DateTime(2011, 01, 01), EndDate = new DateTime(2014, 06, 01), Price = 120},
                //                new ServicePrice {StartDate = new DateTime(2014, 07, 01), Price = 180}
                //            }
                //        }
                //    };

                //    foreach (var service in services)
                //        foreach (var servicePrice in service.Prices)
                //            servicePrice.Service = service;

                //    dbContext.AddRange(services);
                //}
            }

            Console.WriteLine("Complete");
        }
    }

    public static class DateTimeExtensions
    {
        public static int Months(this DateTime date)
        {
            var start = new DateTime(1900, 1, 1);

            return date.Year * 12 + date.Month - (start.Year * 12 + start.Month);
        }
    }
}