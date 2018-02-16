﻿using System;

namespace Domovoi.DAL.Models
{
    public sealed class Consumer
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime JoinDate { get; set; }
    }
}