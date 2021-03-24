using CheckIt.Domain.Entities.Todos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CheckIt.Infrastructure.DbContexts.Configurations
{
    public class TodoListConfiguration : IEntityTypeConfiguration<TodoList>
    {
        public void Configure(EntityTypeBuilder<TodoList> builder)
        {
            builder.HasMany(e => e.Todos)
                .WithOne(e => e.List);

            builder.HasOne(e => e.Icon)
                .WithMany(e => e.TodoLists)
                .HasForeignKey(e => e.IconId);
        }
    }
}