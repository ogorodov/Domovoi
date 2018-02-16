using System.Collections.Generic;

namespace Domovoi.DAL.Models
{
    public class HousingObject
    {
        public int Id { get; set; }
        public List<OrganizationHousingObject> OrganizationHousingObjects { get; set; }
        public string Notes { get; set; }
    }
}