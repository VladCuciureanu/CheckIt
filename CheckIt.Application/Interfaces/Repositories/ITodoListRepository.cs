using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CheckIt.Domain.Entities.Todos;

namespace CheckIt.Application.Interfaces.Repositories
{
    public interface ITodoListRepository
    {
        IQueryable<TodoList> TodoLists { get; }

        Task<List<TodoList>> GetListAsync();

        Task<TodoList> GetByIdAsync(int todoListId);

        Task<int> InsertAsync(TodoList todoList);

        Task UpdateAsync(TodoList todoList);

        Task DeleteAsync(TodoList todoList);
    }
}