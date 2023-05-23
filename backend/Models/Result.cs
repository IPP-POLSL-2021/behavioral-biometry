namespace backend.Models
{
    public enum PromptType
    {
        Fixed,
        Flex
    }
    public class Result
    {
        public int Id { get; set; }
        public bool result { get; set; }
        public string prompt { get; set; }
        public int userId { get; set; }
        public PromptType promptType { get; set; }
        public User? loggedUser { get; set; }
    }
}
