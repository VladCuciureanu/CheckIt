using System.Collections.Generic;

namespace CheckIt.Application.Constants
{
    public static class Permissions
    {
        public static List<string> GeneratePermissionsForModule(string module)
        {
            return new List<string>
            {
                $"Permissions.{module}.Create",
                $"Permissions.{module}.View",
                $"Permissions.{module}.Edit",
                $"Permissions.{module}.Delete"
            };
        }

        public static class Users
        {
            public const string View = "Permissions.Users.View";
            public const string Create = "Permissions.Users.Create";
            public const string Edit = "Permissions.Users.Edit";
            public const string Delete = "Permissions.Users.Delete";
        }

        public static class Todos
        {
            public const string View = "Permissions.Todos.View";
            public const string Create = "Permissions.Todos.Create";
            public const string Edit = "Permissions.Todos.Edit";
            public const string Delete = "Permissions.Todos.Delete";
        }

        public static class TodoLists
        {
            public const string View = "Permissions.TodoLists.View";
            public const string Create = "Permissions.TodoLists.Create";
            public const string Edit = "Permissions.TodoLists.Edit";
            public const string Delete = "Permissions.TodoLists.Delete";
        }
    }
}