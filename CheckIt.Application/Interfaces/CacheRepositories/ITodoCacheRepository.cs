using System.Collections.Generic;
using System.Threading.Tasks;
using CheckIt.Domain.Entities.Todos;

namespace CheckIt.Application.Interfaces.CacheRepositories
{
    public interface ITodoCacheRepository
    {
        Task<List<Todo>> GetCachedListAsync();

        Task<Todo> GetByIdAsync(int todoId);
    }
}