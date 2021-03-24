using System.Collections.Generic;
using CheckIt.Domain.Abstractions;

namespace CheckIt.Domain.Entities.Todos
{
    public class TodoListIcon : BaseEntity
    {
        public string Name { get; set; }
        public string DataPath { get; set; }

        public IList<TodoList> TodoLists { get; set; }
    }
}