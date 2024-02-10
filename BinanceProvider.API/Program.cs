using BinanceProvider.API;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

var allowedCorsHosts = builder.Configuration["AllowedCorsHosts"]?.Split(",");

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policyBuilder =>
        {
            policyBuilder.WithOrigins(allowedCorsHosts ?? new[] { "*" });
            policyBuilder.AllowAnyHeader();
            policyBuilder.AllowAnyMethod();
            policyBuilder.AllowCredentials();
        });
});

builder.Services.AddAuthorization();

builder.Services.AddScoped<IBinanceClient, BinanceClient>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();



app.MapGet("api/getSymbols", [AllowAnonymous] async ([FromServices] IBinanceClient client) =>
{
    var symbols = await client.GetSymbols();

    return symbols;

});

app.Run();
