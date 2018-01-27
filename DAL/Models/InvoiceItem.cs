namespace Domovoi.DAL.Models
{
    public sealed class InvoiceItem
    {
        public int InvoiceId { get; set; }
        public Invoice Invoice { get; set; }

        public int ServicePriceId { get; set; }
        public ServicePrice ServicePrice { get; set; }

        public byte Quantity { get; set; }
    }
}