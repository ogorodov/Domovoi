using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domovoi.DAL.Models
{
    public sealed class Service
    {
        public int Id { get; set; }

        [MaxLength(500)]
        public string Name { get; set; }

        public List<ServicePrice> Prices { get; set; }
    }
}