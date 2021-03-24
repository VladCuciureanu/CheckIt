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
    public class TodoRepository : ITodoRepository
    {
        private readonly IDistributedCache _distributedCache;
        private readonly IRepositoryAsync<Todo> _repository;
        private readonly IAuthenticatedUserService _authenticatedUserService;

        public TodoRepository(IDistributedCache distributedCache, IRepositoryAsync<Todo> repository, IAuthenticatedUserService authenticatedUserService)
        {
            _distributedCache = distributedCache;
            _repository = repository;
            _authenticatedUserService = authenticatedUserService;
        }

        public IQueryable<Todo> Todos => _repository.Entities;

        public async Task DeleteAsync(Todo todo)
        {
            await _repository.DeleteAsync(todo);
            await _distributedCache.RemoveAsync(TodoCacheKeys.GetListKey(_authenticatedUserService.UserId));
            await _distributedCache.RemoveAsync(TodoCacheKeys.GetKey(_authenticatedUserService.UserId, todo.Id));
        }

        public async Task<Todo> GetByIdAsync(int todoId)
        {
            return await _repository.Entities.Where(p => p.Id == todoId).FirstOrDefaultAsync();
        }

        public async Task<List<Todo>> GetListAsync()
        {
            return await _repository.Entities.ToListAsync();
        }

        public async Task<int> InsertAsync(Todo todo)
        {
            await _repository.AddAsync(todo);
            await _distributedCache.RemoveAsync(TodoCacheKeys.GetListKey(_authenticatedUserService.UserId));
            return todo.Id;
        }

        public async Task UpdateAsync(Todo todo)
        {
            await _repository.UpdateAsync(todo);
            await _distributedCache.RemoveAsync(TodoCacheKeys.GetListKey(_authenticatedUserService.UserId));
            await _distributedCache.RemoveAsync(TodoCacheKeys.GetKey(_authenticatedUserService.UserId, todo.Id));
        }
    }
}