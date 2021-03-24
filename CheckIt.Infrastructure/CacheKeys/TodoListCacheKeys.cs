namespace CheckIt.Infrastructure.CacheKeys
{
    public class TodoListCacheKeys
    {
        public static string GetListKey(string userId)
        {
            return $"User-{userId}-TodoListList";
        }

        public static string SelectListKey => "TodoListSelectList";

        public static string GetKey(string userId, int todoId)
        {
            return $"User-{userId}-TodoList-{todoId}";
        }

        public static string GetDetailsKey(string userId, int todoId)
        {
            return $"User-{userId}-TodoListDetails-{todoId}";
        }
    }
}