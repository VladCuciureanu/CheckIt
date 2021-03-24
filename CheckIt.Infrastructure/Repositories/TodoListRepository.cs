using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CheckIt.Application.Interfaces.Repositories;
using CheckIt.Application.Interfaces.Shared;
using CheckIt.Domain.Entities.Todos;
using CheckIt.Infrastructure.CacheKeys;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;

namespace CheckIt.Infrastructure.Repositories
{
    public class TodoListRepository : ITodoListRepository
    {
        private readonly IDistributedCache _distributedCache;
        private readonly IRepositoryAsync<TodoList> _repository;
        private readonly IAuthenticatedUserService _authenticatedUserService;

        public TodoListRepository(IDistributedCache distributedCache, IRepositoryAsync<TodoList> repository, IAuthenticatedUserService authenticatedUserService)
        {
            _distributedCache = distributedCache;
            _repository = repository;
            _authenticatedUserService = authenticatedUserService;
        }

        public IQueryable<TodoList> TodoLists => _repository.Entities;

        public async Task DeleteAsync(TodoList todoList)
        {
            await _repository.DeleteAsync(todoList);
            await _distributedCache.RemoveAsync(TodoListCacheKeys.GetListKey(_authenticatedUserService.UserId));
            await _distributedCache.RemoveAsync(TodoListCacheKeys.GetKey(_authenticatedUserService.UserId, todoList.Id));
        }

        public async Task<TodoList> GetByIdAsync(int todoListId)
        {
            return await _repository.Entities.Where(p => p.Id == todoListId).FirstOrDefaultAsync();
        }

        public async Task<List<TodoList>> GetListAsync()
        {
            return await _repository.Entities.ToListAsync();
        }

        public async Task<int> InsertAsync(TodoList todoList)
        {
            await _repository.AddAsync(todoList);
            await _distributedCache.RemoveAsync(TodoListCacheKeys.GetListKey(_authenticatedUserService.UserId));
            return todoList.Id;
        }

        public async Task UpdateAsync(TodoList todoList)
        {
            await _repository.UpdateAsync(todoList);
            await _distributedCache.RemoveAsync(TodoListCacheKeys.GetListKey(_authenticatedUserService.UserId));
            await _distributedCache.RemoveAsync(TodoListCacheKeys.GetKey(_authenticatedUserService.UserId, todoList.Id));
        }
    }
}