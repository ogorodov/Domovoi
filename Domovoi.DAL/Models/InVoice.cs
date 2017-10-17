using System.ComponentModel.DataAnnotations;

namespace Domovoi.DAL.Models
{
    public sealed class Invoice
    {
        public int Id { get; set; }

        [Required]
        public Consumer Consumer { get; set; }
    }
}