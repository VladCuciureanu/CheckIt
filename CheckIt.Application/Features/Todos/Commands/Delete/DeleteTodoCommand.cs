using System.Threading;
using System.Threading.Tasks;
using CheckIt.Application.Interfaces.Repositories;
using CheckIt.Application.Results;
using MediatR;

namespace CheckIt.Application.Features.Todos.Commands.Delete
{
    public class DeleteTodoCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }

        public class DeleteTodoCommandHandler : IRequestHandler<DeleteTodoCommand, Result<int>>
        {
            private readonly ITodoRepository _todoRepository;
            private readonly IUnitOfWork _unitOfWork;

            public DeleteTodoCommandHandler(ITodoRepository todoRepository, IUnitOfWork unitOfWork)
            {
                _todoRepository = todoRepository;
                _unitOfWork = unitOfWork;
            }

            public async Task<Result<int>> Handle(DeleteTodoCommand command, CancellationToken cancellationToken)
            {
                var todo = await _todoRepository.GetByIdAsync(command.Id);
                await _todoRepository.DeleteAsync(todo);
                await _unitOfWork.Commit(cancellationToken);
                return Result<int>.Success(todo.Id);
            }
        }
    }
}