using CheckIt.Domain.Entities.Todos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CheckIt.Infrastructure.DbContexts.Configurations
{
    public class TodoListIconConfiguration : IEntityTypeConfiguration<TodoListIcon>
    {
        public void Configure(EntityTypeBuilder<TodoListIcon> builder)
        {
            builder.Ignore(e => e.TodoLists);
        }
    }
}