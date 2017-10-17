using System.ComponentModel.DataAnnotations;

namespace Domovoi.DAL.Models
{
    public sealed class Consumer
    {
        public int Id { get; set; }

        [MaxLength(50)]
        public string FirstName { get; set; }

        [MaxLength(50)]
        public string LastName { get; set; }

        [MaxLength(50)]
        public string MiddleName { get; set; }
    }
}
