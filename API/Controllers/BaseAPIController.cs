using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseAPIController: ControllerBase
    {
        private IMediator mediator;

        //Get Mediator from services if 'mediator' is null (it always will be)
        protected IMediator Mediator => mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result){
            if(result == null) {
                return NotFound();
            }
            if(result.IsSuccess && result.Value != null){
                return Ok(result.Value);
            }
            else if(result.IsSuccess && result.Value == null){
                return NotFound();
            }
            return BadRequest(result.Error);
        }
    }
}