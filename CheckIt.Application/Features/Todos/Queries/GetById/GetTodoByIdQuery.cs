using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CheckIt.Application.Interfaces.CacheRepositories;
using CheckIt.Application.Results;
using MediatR;

namespace CheckIt.Application.Features.Todos.Queries.GetById
{
    public class GetTodoByIdQuery : IRequest<Result<GetTodoByIdResponse>>
    {
        public int Id { get; set; }

        public class GetTodoListByIdQueryHandler : IRequestHandler<GetTodoByIdQuery, Result<GetTodoByIdResponse>>
        {
            private readonly IMapper _mapper;
            private readonly ITodoCacheRepository _todoCache;

            public GetTodoListByIdQueryHandler(ITodoCacheRepository todoCache, IMapper mapper)
            {
                _todoCache = todoCache;
                _mapper = mapper;
            }

            public async Task<Result<GetTodoByIdResponse>> Handle(GetTodoByIdQuery query,
                CancellationToken cancellationToken)
            {
                var todo = await _todoCache.GetByIdAsync(query.Id);
                var mappedTodoList = _mapper.Map<GetTodoByIdResponse>(todo);
                return Result<GetTodoByIdResponse>.Success(mappedTodoList);
            }
        }
    }
}