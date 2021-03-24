using System.Threading;
using System.Threading.Tasks;
using CheckIt.Application.Interfaces.Repositories;
using CheckIt.Application.Results;
using MediatR;

namespace CheckIt.Application.Features.ActivityLog.Commands.AddLog
{
    public class AddActivityLogCommand : IRequest<Result<int>>
    {
        public string Action { get; set; }
        public string userId { get; set; }
    }

    public class AddActivityLogCommandHandler : IRequestHandler<AddActivityLogCommand, Result<int>>
    {
        private readonly ILogRepository _repo;

        public AddActivityLogCommandHandler(ILogRepository repo, IUnitOfWork unitOfWork)
        {
            _repo = repo;
            _unitOfWork = unitOfWork;
        }

        private IUnitOfWork _unitOfWork { get; }

        public async Task<Result<int>> Handle(AddActivityLogCommand request, CancellationToken cancellationToken)
        {
            await _repo.AddLogAsync(request.Action, request.userId);
            await _unitOfWork.Commit(cancellationToken);
            return Result<int>.Success(1);
        }
    }
}