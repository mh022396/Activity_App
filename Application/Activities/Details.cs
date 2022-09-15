using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities {
    public class Details {
        public class Query : IRequest<Result<Activity>> {
            public Query(Guid Id)
            {
                this.Id = Id;
            }

            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Activity>> {//Query and return value
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.Id);
                
                return Result<Activity>.Success(activity);
            }
        }
    }
}