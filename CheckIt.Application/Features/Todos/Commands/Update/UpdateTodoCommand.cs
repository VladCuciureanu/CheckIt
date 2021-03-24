using System;
using System.Threading;
using System.Threading.Tasks;
using CheckIt.Application.Interfaces.Repositories;
using CheckIt.Application.Results;
using FluentValidation;
using MediatR;

namespace CheckIt.Application.Features.Todos.Commands.Update
{
    public class UpdateTodoCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public bool? Done { get; set; }
        public bool? Pinned { get; set; }
        public DateTime? DueDate { get; set; }

        public class UpdateTodoListCommandHandler : IRequestHandler<UpdateTodoCommand, Result<int>>
        {
            private readonly ITodoRepository _todoRepository;
            private readonly IUnitOfWork _unitOfWork;

            public UpdateTodoListCommandHandler(ITodoRepository todoRepository, IUnitOfWork unitOfWork)
            {
                _todoRepository = todoRepository;
                _unitOfWork = unitOfWork;
            }

            public async Task<Result<int>> Handle(UpdateTodoCommand command, CancellationToken cancellationToken)
            {
                var todo = await _todoRepository.GetByIdAsync(command.Id);

                if (todo == null) return Result<int>.Fail("Todo Not Found.");

                todo.Title = command.Title ?? todo.Title;
                todo.Content = command.Content ?? todo.Content;
                todo.Done = command.Done ?? todo.Done;
                todo.Pinned = command.Pinned ?? todo.Pinned;
                todo.DueDate = command.DueDate ?? todo.DueDate;
                await _todoRepository.UpdateAsync(todo);
                await _unitOfWork.Commit(cancellationToken);
                return Result<int>.Success(todo.Id);
            }
        }
        
        public class UpdateTodoCommandValidator : AbstractValidator<UpdateTodoCommand>
        {
            public UpdateTodoCommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Content).NotEmpty();
            }
        }
    }
}