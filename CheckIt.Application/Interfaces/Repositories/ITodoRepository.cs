using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CheckIt.Domain.Entities.Todos;

namespace CheckIt.Application.Interfaces.Repositories
{
    public interface ITodoRepository
    {
        IQueryable<Todo> Todos { get; }

        Task<List<Todo>> GetListAsync();

        Task<Todo> GetByIdAsync(int todoId);

        Task<int> InsertAsync(Todo todo);

        Task UpdateAsync(Todo todo);

        Task DeleteAsync(Todo todo);
    }
}