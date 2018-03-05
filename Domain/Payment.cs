using System;

namespace Domovoi.Domain
{
    public sealed class Payment
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public decimal Amount { get; set; }
    }
}