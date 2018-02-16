using Domovoi.DAL.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Domovoi.DAL.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Consumer> Consumers { get; set; }
        public DbSet<HousingObject> HousingObjects { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceItem> InvoiceItems { get; set; }
        public DbSet<InvoicePayment> InvoicePayments { get; set; }
        public DbSet<Organisation> Organisations { get; set; }
        public DbSet<OrganizationHousingObject> OrganizationHousingObjects { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<ServicePrice> ServicePrices { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<InvoiceItem>().HasKey(o => new {o.ServicePriceId, o.InvoiceId});
            builder.Entity<OrganizationHousingObject>().HasKey(o => new {o.OrganisationId, o.HousingObjectId});

            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}