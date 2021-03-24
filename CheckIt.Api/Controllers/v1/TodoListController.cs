using System.Threading.Tasks;
using CheckIt.API.Controllers;
using CheckIt.Application.Features.TodoLists.Commands.Create;
using CheckIt.Application.Features.TodoLists.Commands.Delete;
using CheckIt.Application.Features.TodoLists.Commands.Update;
using CheckIt.Application.Features.TodoLists.Queries.GetAllCached;
using CheckIt.Application.Features.TodoLists.Queries.GetById;
using CheckIt.Application.Features.Todos.Queries.GetAllByListPaged;
using Microsoft.AspNetCore.Mvc;

namespace CheckIt.Api.Controllers.v1
{
    public class TodoListController : BaseApiController<TodoListController>
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var todoLists = await _mediator.Send(new GetAllTodoListsCachedQuery());
            return Ok(todoLists);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var todoList = await _mediator.Send(new GetTodoListByIdQuery {Id = id});
            return Ok(todoList);
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<IActionResult> Post(CreateTodoListCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, UpdateTodoListCommand command)
        {
            if (id != command.Id) return BadRequest();
            return Ok(await _mediator.Send(command));
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _mediator.Send(new DeleteTodoListCommand {Id = id}));
        }

        #region RELATIONSHIPS

        // GET api/<controller>/5/todos
        [HttpGet("{id}/todos")]
        public async Task<IActionResult> GetTodos(int id, int pageNumber=0, int pageSize=0)
        {
            return Ok(await _mediator.Send(new GetAllTodosByListQuery {PageNumber = pageNumber, PageSize = pageSize, ListId = id}));
        }

        // PUT api/<controller>/5/todos/5
        [HttpPut("{parentId}/todos/{childId}")]
        public async Task<IActionResult> AddTodoToTodoList(int parentId, int childId)
        {
            return Ok(await _mediator.Send(new AddTodoToTodoListCommand {ParentId = parentId, ChildId = childId}));
        }

        // DELETE api/<controller>/5/todos/5
        [HttpDelete("{parentId}/todos/{childId}")]
        public async Task<IActionResult> RemoveTodoFromTodoList(int parentId, int childId)
        {
            return Ok(await _mediator.Send(new RemoveTodoFromTodoListCommand {ParentId = parentId, ChildId = childId}));
        }

        #endregion
    }
}