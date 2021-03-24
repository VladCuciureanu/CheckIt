using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CheckIt.Application.DTOs;
using CheckIt.Application.Interfaces.Repositories;
using CheckIt.Application.Results;
using MediatR;

namespace CheckIt.Application.Features.ActivityLog.Queries.GetUserLogs
{
    public class GetAuditLogsQuery : IRequest<Result<List<AuditLogResponse>>>
    {
        public string userId { get; set; }
    }

    public class GetAuditLogsQueryHandler : IRequestHandler<GetAuditLogsQuery, Result<List<AuditLogResponse>>>
    {
        private readonly IMapper _mapper;
        private readonly ILogRepository _repo;

        public GetAuditLogsQueryHandler(ILogRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<Result<List<AuditLogResponse>>> Handle(GetAuditLogsQuery request,
            CancellationToken cancellationToken)
        {
            var logs = await _repo.GetAuditLogsAsync(request.userId);
            return Result<List<AuditLogResponse>>.Success(logs);
        }
    }
}