using System.Collections.Generic;
using System.Threading.Tasks;
using CheckIt.Domain.Entities.Todos;

namespace CheckIt.Application.Interfaces.CacheRepositories
{
    public interface ITodoListCacheRepository
    {
        Task<List<TodoList>> GetCachedListAsync();

        Task<TodoList> GetByIdAsync(int todoListId);
    }
}