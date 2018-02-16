using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domovoi.DAL.Models
{
    public sealed class Organisation
    {
        public int Id { get; set; }
        public List<OrganizationHousingObject> OrganizationHousingObjects { get; set; }

        [MaxLength(150)]
        public string Name { get; set; }
    }
}