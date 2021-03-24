using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using CheckIt.Application.Interfaces.Contexts;
using CheckIt.Application.Interfaces.Shared;
using CheckIt.Domain.Abstractions;
using CheckIt.Domain.Entities.Todos;
using CheckIt.Infrastructure.AuditTrail;
using Microsoft.EntityFrameworkCore;

namespace CheckIt.Infrastructure.DbContexts
{
    public class ApplicationDbContext : AuditableContext, IApplicationDbContext
    {
        private readonly IAuthenticatedUserService _authenticatedUser;
        private readonly IDateTimeService _dateTime;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IDateTimeService dateTime,
            IAuthenticatedUserService authenticatedUser) : base(options)
        {
            _dateTime = dateTime;
            _authenticatedUser = authenticatedUser;
        }

        public DbSet<Todo> Todos { get; set; }

        public DbSet<TodoList> TodoLists { get; set; }

        public IDbConnection Connection => Database.GetDbConnection();

        public bool HasChanges => ChangeTracker.HasChanges();

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            foreach (var entry in ChangeTracker.Entries<AuditableEntity>().ToList())
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedOn = _dateTime.NowUtc;
                        entry.Entity.CreatedBy = _authenticatedUser.UserId;
                        break;

                    case EntityState.Modified:
                        entry.Entity.LastModifiedOn = _dateTime.NowUtc;
                        entry.Entity.LastModifiedBy = _authenticatedUser.UserId;
                        break;
                }

            if (_authenticatedUser.UserId == null)
                return await base.SaveChangesAsync(cancellationToken);
            return await base.SaveChangesAsync(_authenticatedUser.UserId);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            builder.Entity<Todo>().HasQueryFilter(e => e.CreatedBy == _authenticatedUser.UserId);
            builder.Entity<TodoList>().HasQueryFilter(e => e.CreatedBy == _authenticatedUser.UserId);
            
            foreach (var property in builder.Model.GetEntityTypes()
                .SelectMany(t => t.GetProperties())
                .Where(p => p.ClrType == typeof(decimal) || p.ClrType == typeof(decimal?)))
                property.SetColumnType("decimal(18,2)");
            base.OnModelCreating(builder);
        }
    }
}