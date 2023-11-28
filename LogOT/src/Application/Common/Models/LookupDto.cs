﻿using mentor_v1.Application.Common.Mappings;
using mentor_v1.Domain.Entities;

namespace mentor_v1.Application.Common.Models;

// Note: This is currently just used to demonstrate applying multiple IMapFrom attributes.
public class LookupDto : IMapFrom<TodoList>, IMapFrom<TodoItem>
{
    public int Id { get; set; }

    public string? Title { get; set; }
}
