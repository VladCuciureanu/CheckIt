using System.Collections.Generic;
using System.Threading.Tasks;
using CheckIt.Application.DTOs;

namespace CheckIt.Application.Interfaces.Repositories
{
    public interface ILogRepository
    {
        Task<List<AuditLogResponse>> GetAuditLogsAsync(string userId);

        Task AddLogAsync(string action, string userId);
    }
}