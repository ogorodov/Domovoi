namespace Domovoi.Domain
{
    public sealed class InvoicePayment
    {
        public int Id { get; set; }
        public Invoice Invoice { get; set; }
        public Payment Payment { get; set; }
        public decimal Amount { get; set; }
    }
}
