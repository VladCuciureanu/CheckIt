using System.Data;
using System.Threading;
using System.Threading.Tasks;
using CheckIt.Domain.Entities.Todos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace CheckIt.Application.Interfaces.Contexts
{
    public interface IApplicationDbContext
    {
        IDbConnection Connection { get; }
        bool HasChanges { get; }

        DbSet<Todo> Todos { get; set; }

        DbSet<TodoList> TodoLists { get; set; }

        EntityEntry Entry(object entity);

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}