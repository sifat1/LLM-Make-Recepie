using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace RecipeAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecipeController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public RecipeController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpPost("recipe")]
        public async Task<IActionResult> GenerateRecipe([FromBody] RecipeRequest request)
        {
            var jsonContent = new StringContent(
                $"{{\"ingredients\":\"{request.Ingredients}\"}}",
                Encoding.UTF8,
                "application/json"
            );

            var response = await _httpClient.PostAsync("http://fastapi:8000/generate", jsonContent);
            if (response.IsSuccessStatusCode)
            {
                var generatedText = await response.Content.ReadAsStringAsync();
                return Ok(generatedText);
            }

            return StatusCode(500, "Error generating recipe");
        }
    }

    public class RecipeRequest
    {
        public string Ingredients { get; set; }
    }
}
