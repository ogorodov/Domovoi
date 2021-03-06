﻿using System;

namespace Domovoi.Domain
{
    public sealed class ServicePrice
    {
        public int Id { get; set; }
        public Service Service { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal Price { get; set; }
    }
}