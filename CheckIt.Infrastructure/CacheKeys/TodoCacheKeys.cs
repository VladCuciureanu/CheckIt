namespace CheckIt.Infrastructure.CacheKeys
{
    public class TodoCacheKeys
    {
        public static string GetListKey(string userId)
        {
            return $"User-{userId}-TodoList";
        }

        public static string SelectListKey => "TodoSelectList";

        public static string GetKey(string userId, int todoId)
        {
            return $"User-{userId}-Todo-{todoId}";
        }

        public static string GetDetailsKey(string userId, int todoId)
        {
            return $"User-{userId}-TodoDetails-{todoId}";
        }
    }
}