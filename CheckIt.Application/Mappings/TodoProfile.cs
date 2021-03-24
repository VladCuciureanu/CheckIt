using AutoMapper;
using CheckIt.Application.Features.Todos.Commands.Create;
using CheckIt.Application.Features.Todos.Queries.GetAllCached;
using CheckIt.Application.Features.Todos.Queries.GetAllPaged;
using CheckIt.Application.Features.Todos.Queries.GetById;
using CheckIt.Domain.Entities.Todos;

namespace CheckIt.Application.Mappings
{
    internal class TodoProfile : Profile
    {
        public TodoProfile()
        {
            CreateMap<CreateTodoCommand, Todo>().ReverseMap();
            CreateMap<GetTodoByIdResponse, Todo>().ReverseMap();
            CreateMap<GetAllTodosCachedResponse, Todo>().ReverseMap();
            CreateMap<GetAllTodosResponse, Todo>().ReverseMap();
        }
    }
}