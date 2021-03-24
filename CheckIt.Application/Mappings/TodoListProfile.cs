using AutoMapper;
using CheckIt.Application.Features.TodoLists.Commands.Create;
using CheckIt.Application.Features.TodoLists.Queries.GetAllCached;
using CheckIt.Application.Features.TodoLists.Queries.GetAllPaged;
using CheckIt.Application.Features.TodoLists.Queries.GetById;
using CheckIt.Domain.Entities.Todos;

namespace CheckIt.Application.Mappings
{
    internal class TodoListProfile : Profile
    {
        public TodoListProfile()
        {
            CreateMap<CreateTodoListCommand, TodoList>().ReverseMap();
            CreateMap<GetTodoListByIdResponse, TodoList>().ReverseMap();
            CreateMap<GetAllTodoListsCachedResponse, TodoList>().ReverseMap();
            CreateMap<GetAllTodoListsResponse, TodoList>().ReverseMap();
        }
    }
}