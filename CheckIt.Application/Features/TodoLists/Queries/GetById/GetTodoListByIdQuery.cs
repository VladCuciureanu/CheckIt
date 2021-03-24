using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CheckIt.Application.Interfaces.CacheRepositories;
using CheckIt.Application.Results;
using MediatR;

namespace CheckIt.Application.Features.TodoLists.Queries.GetById
{
    public class GetTodoListByIdQuery : IRequest<Result<GetTodoListByIdResponse>>
    {
        public int Id { get; set; }

        public class
            GetTodoListByIdQueryHandler : IRequestHandler<GetTodoListByIdQuery, Result<GetTodoListByIdResponse>>
        {
            private readonly IMapper _mapper;
            private readonly ITodoListCacheRepository _todoListCache;

            public GetTodoListByIdQueryHandler(ITodoListCacheRepository todoListCache, IMapper mapper)
            {
                _todoListCache = todoListCache;
                _mapper = mapper;
            }

            public async Task<Result<GetTodoListByIdResponse>> Handle(GetTodoListByIdQuery query,
                CancellationToken cancellationToken)
            {
                var todoList = await _todoListCache.GetByIdAsync(query.Id);
                var mappedTodoList = _mapper.Map<GetTodoListByIdResponse>(todoList);
                return Result<GetTodoListByIdResponse>.Success(mappedTodoList);
            }
        }
    }
}