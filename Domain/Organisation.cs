using System.Collections.Generic;

namespace Domovoi.Domain
{
    public sealed class Organisation
    {
        public int Id { get; set; }
        public List<OrganizationHousingObject> OrganizationHousingObjects { get; set; }
        public string Name { get; set; }
    }
}