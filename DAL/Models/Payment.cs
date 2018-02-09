using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domovoi.DAL.Models
{
    public sealed class Payment
    {
        public int Id { get; set; }

        public int ConsumerId { get; set; }

        [Required]
        public Consumer Consumer { get; set; }

        [Required]
        public DateTime DateTime { get; set; }

        [Required]
        [Column(TypeName = "money")]
        public decimal Amount { get; set; }
    }
}