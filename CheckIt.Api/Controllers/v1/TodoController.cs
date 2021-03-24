using System.Threading.Tasks;
using CheckIt.API.Controllers;
using CheckIt.Application.Features.Todos.Commands.Create;
using CheckIt.Application.Features.Todos.Commands.Delete;
using CheckIt.Application.Features.Todos.Commands.Update;
using CheckIt.Application.Features.Todos.Queries.GetAllCached;
using CheckIt.Application.Features.Todos.Queries.GetById;
using Microsoft.AspNetCore.Mvc;

namespace CheckIt.Api.Controllers.v1
{
    public class TodoController : BaseApiController<TodoController>
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var todos = await _mediator.Send(new GetAllTodosCachedQuery());
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var todo = await _mediator.Send(new GetTodoByIdQuery {Id = id});
            return Ok(todo);
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<IActionResult> Post(CreateTodoCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, UpdateTodoCommand command)
        {
            if (id != command.Id) return BadRequest();
            return Ok(await _mediator.Send(command));
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _mediator.Send(new DeleteTodoCommand {Id = id}));
        }
    }
}