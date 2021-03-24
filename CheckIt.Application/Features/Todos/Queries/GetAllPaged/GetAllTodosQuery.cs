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

namespace CheckIt.Application.Features.Todos.Queries.GetAllPaged
{
    public class GetAllTodosQuery : IRequest<PaginatedResult<GetAllTodosResponse>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }

    public class GetAllTodosQueryHandler : IRequestHandler<GetAllTodosQuery, PaginatedResult<GetAllTodosResponse>>
    {
        private readonly ITodoRepository _repository;

        public GetAllTodosQueryHandler(ITodoRepository repository)
        {
            _repository = repository;
        }

        public async Task<PaginatedResult<GetAllTodosResponse>> Handle(GetAllTodosQuery request,
            CancellationToken cancellationToken)
        {
            Expression<Func<Todo, GetAllTodosResponse>> expression = e => new GetAllTodosResponse
            {
                Id = e.Id,
                Title = e.Title,
                Content = e.Content,
                Done = e.Done,
                Pinned = e.Pinned,
                DueDate = e.DueDate,
                ListId = e.ListId
            };
            var paginatedList = await _repository.Todos
                .Select(expression)
                .Where(e=>!e.ListId.HasValue)
                .ToPaginatedListAsync(request.PageNumber, request.PageSize);
            return paginatedList;
        }
    }
}