using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domovoi.DAL.Models
{
    public sealed class Invoice
    {
        public int Id { get; set; }

        [Required]
        public Consumer Consumer { get; set; }

        [Column(TypeName = "date")]
        public DateTime Date { get; set; }

        public List<InvoiceItem> Items { get; set; }
    }
}