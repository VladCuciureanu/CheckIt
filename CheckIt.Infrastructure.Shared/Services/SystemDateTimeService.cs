using System;
using CheckIt.Application.Interfaces.Shared;

namespace CheckIt.Infrastructure.Shared.Services
{
    public class SystemDateTimeService : IDateTimeService
    {
        public DateTime NowUtc => DateTime.UtcNow;
    }
}