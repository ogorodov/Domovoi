using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domovoi.DAL.Models
{
    public sealed class InvoicePayment
    {
        public int Id { get; set; }

        [Required]
        public Invoice Invoice { get; set; }

        public Payment Payment { get; set; }

        [Column(TypeName = "money")]
        public decimal Amount { get; set; }
    }
}
