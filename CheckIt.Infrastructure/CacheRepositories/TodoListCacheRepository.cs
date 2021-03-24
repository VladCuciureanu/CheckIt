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
    public class TodoListCacheRepository : ITodoListCacheRepository
    {
        private readonly IDistributedCache _distributedCache;
        private readonly ITodoListRepository _todoListRepository;
        private readonly IAuthenticatedUserService _authenticatedUserService;

        public TodoListCacheRepository(IDistributedCache distributedCache, ITodoListRepository todoListRepository, IAuthenticatedUserService authenticatedUserService)
        {
            _distributedCache = distributedCache;
            _todoListRepository = todoListRepository;
            _authenticatedUserService = authenticatedUserService;
        }

        public async Task<TodoList> GetByIdAsync(int todoListId)
        {
            var cacheKey = TodoListCacheKeys.GetKey(_authenticatedUserService.UserId, todoListId);
            var todoList = await _distributedCache.GetAsync<TodoList>(cacheKey);
            if (todoList == null)
            {
                todoList = await _todoListRepository.GetByIdAsync(todoListId);
                Throw.Exception.IfNull(todoList, "TodoList", "No TodoList Found");
                await _distributedCache.SetAsync(cacheKey, todoList);
            }

            return todoList;
        }

        public async Task<List<TodoList>> GetCachedListAsync()
        {
            var cacheKey = TodoListCacheKeys.GetListKey(_authenticatedUserService.UserId);
            var todoListList = await _distributedCache.GetAsync<List<TodoList>>(cacheKey);
            if (todoListList == null)
            {
                todoListList = await _todoListRepository.GetListAsync();
                await _distributedCache.SetAsync(cacheKey, todoListList);
            }

            return todoListList;
        }
    }
}