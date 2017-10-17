using System;
using System.ComponentModel.DataAnnotations;

namespace Domovoi.DAL.Models
{
    public sealed class Payment
    {
        public int Id { get; set; }

        [Required]
        public Consumer Consumer { get; set; }

        [Required]
        public DateTime DateTime { get; set; }
    }
}