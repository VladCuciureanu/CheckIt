using System.Reflection;
using CheckIt.Application.Interfaces.CacheRepositories;
using CheckIt.Application.Interfaces.Contexts;
using CheckIt.Application.Interfaces.Repositories;
using CheckIt.Infrastructure.CacheRepositories;
using CheckIt.Infrastructure.DbContexts;
using CheckIt.Infrastructure.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CheckIt.Infrastructure.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddPersistenceContexts(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddScoped<IApplicationDbContext, ApplicationDbContext>();
        }

        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddTransient(typeof(IRepositoryAsync<>), typeof(RepositoryAsync<>));
            services.AddTransient<ITodoRepository, TodoRepository>();
            services.AddTransient<ITodoCacheRepository, TodoCacheRepository>();
            services.AddTransient<ITodoListRepository, TodoListRepository>();
            services.AddTransient<ITodoListCacheRepository, TodoListCacheRepository>();
            services.AddTransient<ILogRepository, LogRepository>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
        }
    }
}