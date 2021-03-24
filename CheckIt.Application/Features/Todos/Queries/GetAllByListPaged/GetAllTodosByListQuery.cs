using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using CheckIt.Application.Exceptions;
using CheckIt.Application.Extensions;
using CheckIt.Application.Extensions.Exceptions;
using CheckIt.Application.Interfaces.Repositories;
using CheckIt.Application.Results;
using CheckIt.Domain.Entities.Todos;
using MediatR;

namespace CheckIt.Application.Features.Todos.Queries.GetAllByListPaged
{
    public class GetAllTodosByListQuery : IRequest<PaginatedResult<GetAllTodosByListResponse>>
    {
        public int ListId { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }

    public class
        GetAllTodosQueryHandler : IRequestHandler<GetAllTodosByListQuery, PaginatedResult<GetAllTodosByListResponse>>
    {
        private readonly ITodoRepository _todoRepository;
        private readonly ITodoListRepository _todoListrepository;

        public GetAllTodosQueryHandler(ITodoRepository todoRepository, ITodoListRepository todoListRepository)
        {
            _todoRepository = todoRepository;
            _todoListrepository = todoListRepository;
        }

        public async Task<PaginatedResult<GetAllTodosByListResponse>> Handle(GetAllTodosByListQuery request,
            CancellationToken cancellationToken)
        {
            var todoList = await _todoListrepository.GetByIdAsync(request.ListId);
            Throw.Exception.IfNull(todoList, "Todo List Not Found.");
            Expression<Func<Todo, GetAllTodosByListResponse>> expression = e => new GetAllTodosByListResponse
            {
                Id = e.Id,
                Title = e.Title,
                Content = e.Content,
                Done = e.Done,
                Pinned = e.Pinned,
                DueDate = e.DueDate,
                ListId = e.ListId
            };
            var paginatedList = await _todoRepository.Todos
                .Select(expression)
                .Where(e => e.ListId.Equals(request.ListId))
                .ToPaginatedListAsync(request.PageNumber, request.PageSize);
            return paginatedList;
        }
    }
}