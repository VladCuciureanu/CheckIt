using System.Collections.Generic;
using System.Threading.Tasks;
using CheckIt.Application.Exceptions;
using CheckIt.Application.Extensions.Exceptions;
using CheckIt.Application.Interfaces.CacheRepositories;
using CheckIt.Application.Interfaces.Repositories;
using CheckIt.Application.Interfaces.Shared;
using CheckIt.Domain.Entities.Todos;
using CheckIt.Infrastructure.CacheKeys;
using CheckIt.Infrastructure.Extensions.Caching;
using Microsoft.Extensions.Caching.Distributed;

namespace CheckIt.Infrastructure.CacheRepositories
{
    public class TodoCacheRepository : ITodoCacheRepository
    {
        private readonly IDistributedCache _distributedCache;
        private readonly ITodoRepository _todoRepository;
        private readonly IAuthenticatedUserService _authenticatedUserService;

        public TodoCacheRepository(IDistributedCache distributedCache, ITodoRepository todoRepository, IAuthenticatedUserService authenticatedUserService)
        {
            _distributedCache = distributedCache;
            _todoRepository = todoRepository;
            _authenticatedUserService = authenticatedUserService;
        }

        public async Task<Todo> GetByIdAsync(int todoId)
        {
            var cacheKey = TodoCacheKeys.GetKey(_authenticatedUserService.UserId, todoId);
            var todo = await _distributedCache.GetAsync<Todo>(cacheKey);
            if (todo == null)
            {
                todo = await _todoRepository.GetByIdAsync(todoId);
                Throw.Exception.IfNull(todo, "Todo", "No Todo Found");
                await _distributedCache.SetAsync(cacheKey, todo);
            }

            return todo;
        }

        public async Task<List<Todo>> GetCachedListAsync()
        {
            var cacheKey = TodoCacheKeys.GetListKey(_authenticatedUserService.UserId);
            var todoList = await _distributedCache.GetAsync<List<Todo>>(cacheKey);
            if (todoList == null)
            {
                todoList = await _todoRepository.GetListAsync();
                await _distributedCache.SetAsync(cacheKey, todoList);
            }

            return todoList;
        }
    }
}