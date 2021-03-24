using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CheckIt.Application.Interfaces.CacheRepositories;
using CheckIt.Application.Results;
using MediatR;

namespace CheckIt.Application.Features.TodoLists.Queries.GetAllCached
{
    public class GetAllTodoListsCachedQuery : IRequest<Result<List<GetAllTodoListsCachedResponse>>>
    {
    }

    public class GetAllTodoListsCachedQueryHandler : IRequestHandler<GetAllTodoListsCachedQuery,
        Result<List<GetAllTodoListsCachedResponse>>>
    {
        private readonly IMapper _mapper;
        private readonly ITodoListCacheRepository _todoListCache;

        public GetAllTodoListsCachedQueryHandler(ITodoListCacheRepository todoListCache, IMapper mapper)
        {
            _todoListCache = todoListCache;
            _mapper = mapper;
        }

        public async Task<Result<List<GetAllTodoListsCachedResponse>>> Handle(GetAllTodoListsCachedQuery request,
            CancellationToken cancellationToken)
        {
            var todoList = await _todoListCache.GetCachedListAsync();
            var mappedTodoLists = _mapper.Map<List<GetAllTodoListsCachedResponse>>(todoList);
            return Result<List<GetAllTodoListsCachedResponse>>.Success(mappedTodoLists);
        }
    }
}