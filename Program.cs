using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql;
using ProductAPI.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// Adatbázis kapcsolat hozzáadása
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 29))));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowAll");

app.UseSwagger();
app.UseSwaggerUI();
app.UseAuthorization();
app.MapControllers();

// 🔹 ALAPÉRTELMEZETT ÚTVONAL HOZZÁADÁSA
app.MapGet("/", () => "Welcome to the Product API!");

app.Run();