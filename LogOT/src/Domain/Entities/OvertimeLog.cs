﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using mentor_v1.Domain.Identity;

namespace mentor_v1.Domain.Entities;
public class OvertimeLog : BaseAuditableEntity
{
    [ForeignKey("ApplicationUser")]
    public string ApplicationUserId { get; set; }
    public DateTime Date { get; set; }
    public int Hours { get; set; }
    public string? CancelReason { get; set; }
    public LogStatus Status { get; set; }
    public virtual ApplicationUser ApplicationUser { get; set; }
}