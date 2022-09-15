using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;


namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            //Build and store host
            var host = CreateHostBuilder(args).Build(); 
            //Create host services that we create
            using var scope = host.Services.CreateScope(); // will dispose of scope after method
            //Get a service provider
            var services = scope.ServiceProvider;
            try
            {
                //Get our datacontext we created as a service
                var context = services.GetRequiredService<DataContext>();
                //Applies migrations for the context to the database, will create database if does not already exist
                context.Database.Migrate();
                await Seed.SeedData(context);
            }
            catch (System.Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "Error occured during migration");
            }
            //Start Application
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
