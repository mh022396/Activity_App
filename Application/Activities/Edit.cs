using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
            public Command(Activity activity) 
            {
                this.Activity = activity;
    
            }                  
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(command => command.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;           
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.Activity.Id);

                if(activity == null){
                    return null;
                }

                mapper.Map(request.Activity, activity);
                
                
                if(!(await context.SaveChangesAsync() > 0)){ //is number of changes greater than 0
                    
                    return Result<Unit>.Failure("Failed to update activity");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}