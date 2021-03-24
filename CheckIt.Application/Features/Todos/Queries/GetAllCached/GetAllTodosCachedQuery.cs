using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CheckIt.Application.Interfaces.CacheRepositories;
using CheckIt.Application.Results;
using MediatR;

namespace CheckIt.Application.Features.Todos.Queries.GetAllCached
{
    public class GetAllTodosCachedQuery : IRequest<Result<List<GetAllTodosCachedResponse>>>
    {
    }

    public class
        GetAllTodosCachedQueryHandler : IRequestHandler<GetAllTodosCachedQuery, Result<List<GetAllTodosCachedResponse>>>
    {
        private readonly IMapper _mapper;
        private readonly ITodoCacheRepository _todoCache;

        public GetAllTodosCachedQueryHandler(ITodoCacheRepository todoCache, IMapper mapper)
        {
            _todoCache = todoCache;
            _mapper = mapper;
        }

        public async Task<Result<List<GetAllTodosCachedResponse>>> Handle(GetAllTodosCachedQuery request,
            CancellationToken cancellationToken)
        {
            var todoList = await _todoCache.GetCachedListAsync();
            todoList.RemoveAll(e => e.ListId.HasValue);
            var mappedTodos = _mapper.Map<List<GetAllTodosCachedResponse>>(todoList);
            return Result<List<GetAllTodosCachedResponse>>.Success(mappedTodos);
        }
    }
}