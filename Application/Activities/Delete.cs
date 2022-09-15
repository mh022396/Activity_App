using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Application.Core;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>> {

            public Guid Id { get; set; }
            public Command(Guid id) 
            {
                this.Id = id;
    
            }        
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.Id);

                // if(activity == null) {
                //     return null;
                // }

                context.Remove(activity);

                if(!(await context.SaveChangesAsync() > 0)){
                    return Result<Unit>.Failure("Failed to delete activity");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}