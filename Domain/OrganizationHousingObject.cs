using System;

namespace Domovoi.Domain
{
    public class OrganizationHousingObject
    {
        public int OrganisationId { get; set; }
        public Organisation Organisation { get; set; }
        public int HousingObjectId { get; set; }
        public HousingObject HousingObject { get; set; }
        public DateTime JoinDate { get; set; }
    }
}