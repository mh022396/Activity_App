using Microsoft.AspNetCore.Mvc;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseAPIController
    {
        [HttpGet] // activities
        public async Task<IActionResult> GetActivities(){
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] // activities/id
        public async Task<IActionResult> GetActivity(Guid id){ //id will be gotten from path
            return HandleResult(await Mediator.Send(new Details.Query(id)));
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity){ //Activity will be gotten from the body of the request
            return HandleResult(await Mediator.Send(new Create.Command(activity)));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity){
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command(activity)));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id){
            return HandleResult(await Mediator.Send(new Delete.Command(id)));
        }
    }
}