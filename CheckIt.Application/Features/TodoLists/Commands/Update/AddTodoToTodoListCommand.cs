using System.Threading;
using System.Threading.Tasks;
using CheckIt.Application.Interfaces.Repositories;
using CheckIt.Application.Results;
using MediatR;

namespace CheckIt.Application.Features.TodoLists.Commands.Update
{
    public class AddTodoToTodoListCommand : IRequest<Result<int>>
    {
        public int ParentId { get; set; }
        public int ChildId { get; set; }

        public class AddTodoToTodoListCommandHandler : IRequestHandler<AddTodoToTodoListCommand, Result<int>>
        {
            private readonly ITodoListRepository _todoListRepository;
            private readonly ITodoRepository _todoRepository;
            private readonly IUnitOfWork _unitOfWork;

            public AddTodoToTodoListCommandHandler(ITodoListRepository todoListRepository,
                ITodoRepository todoRepository, IUnitOfWork unitOfWork)
            {
                _todoRepository = todoRepository;
                _todoListRepository = todoListRepository;
                _unitOfWork = unitOfWork;
            }

            public async Task<Result<int>> Handle(AddTodoToTodoListCommand command, CancellationToken cancellationToken)
            {
                var todo = await _todoRepository.GetByIdAsync(command.ChildId);
                var todoList = await _todoListRepository.GetByIdAsync(command.ParentId);

                if (todo == null) return Result<int>.Fail("Todo Not Found.");
                if (todoList == null) return Result<int>.Fail("TodoList Not Found.");
                todoList.Todos.Add(todo);
                await _todoListRepository.UpdateAsync(todoList);
                await _unitOfWork.Commit(cancellationToken);
                return Result<int>.Success(todoList.Id);
            }
        }
    }
}