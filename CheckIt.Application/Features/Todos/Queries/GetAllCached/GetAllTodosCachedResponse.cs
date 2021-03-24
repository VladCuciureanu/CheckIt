using System;

namespace CheckIt.Application.Features.Todos.Queries.GetAllCached
{
    public class GetAllTodosCachedResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public bool Done { get; set; }
        public bool Pinned { get; set; }
        public DateTime? DueDate { get; set; }
        public int? ListId { get; set; }
    }
}