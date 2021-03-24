using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CheckIt.Application.Interfaces.Repositories;
using CheckIt.Application.Results;
using CheckIt.Domain.Entities.Todos;
using FluentValidation;
using MediatR;

namespace CheckIt.Application.Features.Todos.Commands.Create
{
    public class CreateTodoCommand : IRequest<Result<int>>
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime DueDate { get; set; }
    }

    public class CreateTodoCommandHandler : IRequestHandler<CreateTodoCommand, Result<int>>
    {
        private readonly IMapper _mapper;
        private readonly ITodoRepository _todoRepository;

        public CreateTodoCommandHandler(ITodoRepository todoRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _todoRepository = todoRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        private IUnitOfWork _unitOfWork { get; }

        public async Task<Result<int>> Handle(CreateTodoCommand request, CancellationToken cancellationToken)
        {
            var todo = _mapper.Map<Todo>(request);
            await _todoRepository.InsertAsync(todo);
            await _unitOfWork.Commit(cancellationToken);
            return Result<int>.Success(todo.Id);
        }
    }
    
    public class CreateTodoCommandValidator : AbstractValidator<CreateTodoCommand>
    {
        public CreateTodoCommandValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Content).NotEmpty();
            RuleFor(x => x.DueDate).NotNull();
        }
    }
}