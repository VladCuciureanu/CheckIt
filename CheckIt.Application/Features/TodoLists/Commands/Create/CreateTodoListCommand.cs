using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CheckIt.Application.Interfaces.Repositories;
using CheckIt.Application.Results;
using CheckIt.Domain.Entities.Todos;
using FluentValidation;
using MediatR;

namespace CheckIt.Application.Features.TodoLists.Commands.Create
{
    public class CreateTodoListCommand : IRequest<Result<int>>
    {
        public string Name { get; set; }
        public int IconId { get; set; }
    }

    public class CreateTodoListCommandHandler : IRequestHandler<CreateTodoListCommand, Result<int>>
    {
        private readonly IMapper _mapper;
        private readonly ITodoListRepository _todoListRepository;

        public CreateTodoListCommandHandler(ITodoListRepository todoListRepository, IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _todoListRepository = todoListRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        private IUnitOfWork _unitOfWork { get; }

        public async Task<Result<int>> Handle(CreateTodoListCommand request, CancellationToken cancellationToken)
        {
            var todoList = _mapper.Map<TodoList>(request);
            await _todoListRepository.InsertAsync(todoList);
            await _unitOfWork.Commit(cancellationToken);
            return Result<int>.Success(todoList.Id);
        }
    }
    
    public class CreateTodoListCommandValidator : AbstractValidator<CreateTodoListCommand>
    {
        public CreateTodoListCommandValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
        }
    }
}