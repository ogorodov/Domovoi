using System.Collections.Generic;

namespace Domovoi.Domain
{
    public sealed class Service
    {
        public int Id { get; set; }
        public Organisation Organisation { get; set; }
        public string Name { get; set; }
        public bool IsCompulsory { get; set; }
        public List<ServicePrice> Prices { get; set; }
    }
}