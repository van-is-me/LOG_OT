﻿using System.ComponentModel.DataAnnotations.Schema;
using mentor_v1.Domain.Identity;

namespace mentor_v1.Domain.Entities;

public class TodoItem : BaseAuditableEntity
{
    public Guid ListId { get; set; }

    public string? Title { get; set; }

    public string? Note { get; set; }

/*    public PriorityLevel Priority { get; set; }*/

    public DateTime? Reminder { get; set; }

    private bool _done;
    public bool Done
    {
        get => _done;
        set
        {
            if (value == true && _done == false)
            {
                AddDomainEvent(new TodoItemCompletedEvent(this));
            }

            _done = value;
        }
    }

    public TodoList List { get; set; } = null!;

    [ForeignKey("User")]
    public string UserId { get; set; }
    public virtual ApplicationUser User { get; set; }
}
