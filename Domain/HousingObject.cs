using System.Collections.Generic;

namespace Domovoi.Domain
{
    public class HousingObject
    {
        public int Id { get; set; }
        public List<OrganizationHousingObject> OrganizationHousingObjects { get; set; }
        public string Note { get; set; }
    }
}