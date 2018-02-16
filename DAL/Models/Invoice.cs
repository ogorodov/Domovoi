using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domovoi.DAL.Models
{
    public sealed class Invoice
    {
        public int Id { get; set; }
        public OrganizationHousingObject OrganizationHousingObject { get; set; }
        public List<InvoiceItem> Items { get; set; }
        public int Month { get; set; }
    }
}