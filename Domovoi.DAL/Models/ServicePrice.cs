using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domovoi.DAL.Models
{
    public sealed class ServicePrice
    {
        public int Id { get; set; }
        public Service Service { get; set; }

        [Column(TypeName = "date")]
        public DateTime StartDate { get; set; }

        [Column(TypeName = "date")]
        public DateTime? EndDate { get; set; }
        public decimal Price { get; set; }
    }
}