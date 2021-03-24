using System;
using CheckIt.Domain.Abstractions;

namespace CheckIt.Domain.Entities.Todos
{
    public class Todo : AuditableEntity
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public bool Done { get; set; }
        public bool Pinned { get; set; }
        public DateTime DueDate { get; set; }

        public int? ListId { get; set; }
        public TodoList List { get; set; }
    }
}