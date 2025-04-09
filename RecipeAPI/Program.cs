var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(); // 👈 Add this to use controllers
builder.Services.AddHttpClient();  // 👈 Needed for HttpClient in your controller

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS
app.UseCors(); // Apply the CORS policy here

app.UseAuthorization(); // Authorization middleware (if needed)
app.MapControllers();   // This maps attribute-based routes (like [Route("recipe")])

app.Run();
