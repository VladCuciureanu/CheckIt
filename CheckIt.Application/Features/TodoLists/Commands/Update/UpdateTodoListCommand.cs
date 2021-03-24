using System.Threading;
using System.Threading.Tasks;
using CheckIt.Application.Interfaces.Repositories;
using CheckIt.Application.Results;
using FluentValidation;
using MediatR;

namespace CheckIt.Application.Features.TodoLists.Commands.Update
{
    public class UpdateTodoListCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int IconId { get; set; }

        public class UpdateTodoListCommandHandler : IRequestHandler<UpdateTodoListCommand, Result<int>>
        {
            private readonly ITodoListRepository _todoListRepository;
            private readonly IUnitOfWork _unitOfWork;

            public UpdateTodoListCommandHandler(ITodoListRepository todoListRepository, IUnitOfWork unitOfWork)
            {
                _todoListRepository = todoListRepository;
                _unitOfWork = unitOfWork;
            }

            public async Task<Result<int>> Handle(UpdateTodoListCommand command, CancellationToken cancellationToken)
            {
                var todoList = await _todoListRepository.GetByIdAsync(command.Id);

                if (todoList == null) return Result<int>.Fail("TodoList Not Found.");

                todoList.Name = command.Name ?? todoList.Name;
                todoList.IconId = command.IconId == 0 ? todoList.IconId : command.IconId;
                await _todoListRepository.UpdateAsync(todoList);
                await _unitOfWork.Commit(cancellationToken);
                return Result<int>.Success(todoList.Id);
            }
        }
    }

    public class UpdateTodoListCommandValidator : AbstractValidator<UpdateTodoListCommand>
    {
        public UpdateTodoListCommandValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
        }
    }
}