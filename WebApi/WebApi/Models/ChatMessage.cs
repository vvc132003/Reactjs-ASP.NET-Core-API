using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class ChatMessage
    {
        [Key]
        public int Id { get; set; }
        public string User { get; set; }
        public string Message { get; set; }
    }
}
