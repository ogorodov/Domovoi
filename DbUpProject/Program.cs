using System;
using System.Linq;
using System.Reflection;
using DbUp;

namespace Domovoi.DbUpProject
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var connectionString =
                args.FirstOrDefault()
                ?? "Data Source=.\\SQLEXPRESS;Initial Catalog=Domovoi_DbUp;Integrated Security=True";

            EnsureDatabase.For.SqlDatabase(connectionString);

            var upgrader =
                DeployChanges.To
                    .SqlDatabase(connectionString)
                    .WithScriptsEmbeddedInAssembly(Assembly.GetExecutingAssembly())
                    .LogToConsole()
                    .Build();

            var result = upgrader.PerformUpgrade();

            if (!result.Successful)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine(result.Error);
                Console.ResetColor();
            }

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("Success!");
            Console.ResetColor();
            Console.ReadKey();
        }
    }
}