using CheckIt.Domain.Entities.Todos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CheckIt.Infrastructure.DbContexts.Configurations
{
    public class TodoConfiguration : IEntityTypeConfiguration<Todo>
    {
        public void Configure(EntityTypeBuilder<Todo> builder)
        {
            builder.HasOne(e => e.List)
                .WithMany(e => e.Todos)
                .HasForeignKey(e => e.ListId);
        }
    }
}