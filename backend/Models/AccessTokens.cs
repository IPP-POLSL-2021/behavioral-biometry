namespace backend.Models
{
    public class AccessTokens
    {
        public Guid Id { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public User user { get; set; } = null!;
    }
}
