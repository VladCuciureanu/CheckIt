using System.Threading;
using System.Threading.Tasks;
using CheckIt.Application.Interfaces.Repositories;
using CheckIt.Application.Results;
using MediatR;

namespace CheckIt.Application.Features.TodoLists.Commands.Delete
{
    public class DeleteTodoListCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }

        public class DeleteTodoListCommandHandler : IRequestHandler<DeleteTodoListCommand, Result<int>>
        {
            private readonly ITodoListRepository _todoListRepository;
            private readonly IUnitOfWork _unitOfWork;

            public DeleteTodoListCommandHandler(ITodoListRepository todoListRepository, IUnitOfWork unitOfWork)
            {
                _todoListRepository = todoListRepository;
                _unitOfWork = unitOfWork;
            }

            public async Task<Result<int>> Handle(DeleteTodoListCommand command, CancellationToken cancellationToken)
            {
                var todoList = await _todoListRepository.GetByIdAsync(command.Id);
                await _todoListRepository.DeleteAsync(todoList);
                await _unitOfWork.Commit(cancellationToken);
                return Result<int>.Success(todoList.Id);
            }
        }
    }
}