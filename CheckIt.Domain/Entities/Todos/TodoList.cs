using System.Collections.Generic;
using CheckIt.Domain.Abstractions;

namespace CheckIt.Domain.Entities.Todos
{
    public class TodoList : AuditableEntity
    {
        public string Name { get; set; }

        public int IconId { get; set; }
        public virtual TodoListIcon Icon { get; set; }

        public virtual IList<Todo> Todos { get; set; } = new List<Todo>();
    }
}