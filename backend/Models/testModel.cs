using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class testModel
    {
        public int Id { get; set; }
        [StringLength(maximumLength: 150)]
        public int Name { get; set; }
    }
}
