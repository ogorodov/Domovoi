using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Domovoi.DAL.Models
{
    public sealed class Service
    {
        public int Id { get; set; }
        public Organisation Organisation { get; set; }

        [MaxLength(500)]
        public string Name { get; set; }

        [DefaultValue(false)]
        public bool IsCompulsory { get; set; }

        public List<ServicePrice> Prices { get; set; }
    }
}