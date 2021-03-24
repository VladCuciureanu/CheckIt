using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using CheckIt.Application.Extensions;
using CheckIt.Application.Interfaces.Repositories;
using CheckIt.Application.Results;
using CheckIt.Domain.Entities.Todos;
using MediatR;

namespace CheckIt.Application.Features.TodoLists.Queries.GetAllPaged
{
    public class GetAllTodoListsQuery : IRequest<PaginatedResult<GetAllTodoListsResponse>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }

    public class
        GGetAllTodoListsQueryHandler : IRequestHandler<GetAllTodoListsQuery, PaginatedResult<GetAllTodoListsResponse>>
    {
        private readonly ITodoListRepository _repository;

        public GGetAllTodoListsQueryHandler(ITodoListRepository repository)
        {
            _repository = repository;
        }

        public async Task<PaginatedResult<GetAllTodoListsResponse>> Handle(GetAllTodoListsQuery request,
            CancellationToken cancellationToken)
        {
            Expression<Func<TodoList, GetAllTodoListsResponse>> expression = e => new GetAllTodoListsResponse
            {
                Id = e.Id,
                Name = e.Name,
                IconId = e.IconId
            };
            var paginatedList = await _repository.TodoLists
                .Select(expression)
                .ToPaginatedListAsync(request.PageNumber, request.PageSize);
            return paginatedList;
        }
    }
}