using System;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using CheckIt.Application.Exceptions;
using CheckIt.Application.Extensions.Exceptions;
using Microsoft.Extensions.Caching.Distributed;

namespace CheckIt.Infrastructure.Extensions.Caching
{
    public static class CachingExtensions
    {
        public static async Task<T> GetAsync<T>(this IDistributedCache distributedCache, string cacheKey,
            CancellationToken token = default)
        {
            Throw.Exception.IfNull(distributedCache, nameof(distributedCache));
            Throw.Exception.IfNull(cacheKey, nameof(cacheKey));
            var utf8Bytes = await distributedCache.GetAsync(cacheKey, token).ConfigureAwait(false);
            if (utf8Bytes != null) return JsonSerializer.Deserialize<T>(utf8Bytes);
            return default;
        }

        public static async Task RemoveAsync(this IDistributedCache distributedCache, string cacheKey,
            CancellationToken token = default)
        {
            Throw.Exception.IfNull(distributedCache, nameof(distributedCache));
            Throw.Exception.IfNull(cacheKey, nameof(cacheKey));
            await distributedCache.RemoveAsync(cacheKey, token).ConfigureAwait(false);
        }

        public static async Task SetAsync<T>(this IDistributedCache distributedCache, string cacheKey, T obj,
            int cacheExpirationInMinutes = 30, CancellationToken token = default)
        {
            Throw.Exception.IfNull(distributedCache, nameof(distributedCache));
            Throw.Exception.IfNull(cacheKey, nameof(cacheKey));
            Throw.Exception.IfNull(obj, nameof(obj));
            var options = new DistributedCacheEntryOptions()
                .SetSlidingExpiration(TimeSpan.FromMinutes(cacheExpirationInMinutes));
            var utf8Bytes = JsonSerializer.SerializeToUtf8Bytes(obj);
            await distributedCache.SetAsync(cacheKey, utf8Bytes, options, token).ConfigureAwait(false);
        }
    }
}