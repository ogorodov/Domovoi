using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domovoi.DAL.Models
{
    public class OrganizationHousingObject
    {
        public int OrganisationId { get; set; }
        public Organisation Organisation { get; set; }

        public int HousingObjectId { get; set; }
        public HousingObject HousingObject { get; set; }

        [Column(TypeName = "date")]
        public DateTime JoinDate { get; set; }
    }
}