using System.ComponentModel.DataAnnotations;

namespace ProductAPI.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 3)]
        public required string Code { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public required string Name { get; set; } = string.Empty;
        public required string Description { get; set; } = string.Empty;

        [Range(0, 100000)]
        public decimal Price { get; set; }
    }
}