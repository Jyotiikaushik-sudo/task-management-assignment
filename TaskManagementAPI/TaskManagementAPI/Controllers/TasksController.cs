using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagementAPI.Data;
using TaskManagementAPI.DTOs;
using TaskManagementAPI.Model;

namespace TaskManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet("Get")]
        public async Task<IActionResult> GetAllTasks()
        {
            var taskks = await _context.Tasks
       .Where(t => !t.is_deleted)
       .OrderByDescending(t => t.created_on)
       .ToListAsync();

            return Ok(taskks);
        }
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetAllTasksbyId(int id)
        {
            var task = await _context.Tasks
       .Where(t => t.task_id == id && !t.is_deleted)
       .Select(t => new
       {
           t.task_id,
           t.task_title,
           t.task_description,
           t.task_due_date,
           t.task_status,
           t.task_remarks,
           t.created_on,
           t.last_updated_on,
           t.created_by_user_id,
           t.last_updated_by_user_id
       })
        .FirstOrDefaultAsync();

            if (task == null)
                return NotFound("Task not found");

            return Ok(task);
        }
        [HttpPost("create")]
        public async Task<IActionResult> CreateTask(CreateTaskDto dto)
        {
            var task = new TaskItem
            {
                task_title = dto.TaskTitle,
                task_description = dto.TaskDescription,
                task_due_date = dto.TaskDueDate,
                task_status = dto.TaskStatus,
                task_remarks = dto.TaskRemarks,
                created_on = DateTime.UtcNow,
                created_by_user_id = dto.CreatedByUserId
            };
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Task created successfully",
                taskId = task.task_id
            });
        }
        [HttpPost("Update")]
        public async Task<IActionResult> UpdateTask(UpdateTaskDto dto)
        {
            var task = await _context.Tasks
       .FirstOrDefaultAsync(t => t.task_id == dto.task_id && !t.is_deleted);

            if (task == null)
                return NotFound("Task not found");
            task.task_title = dto.task_title;
            task.task_description = dto.task_description;
            task.task_due_date = dto.task_due_date;
            task.task_status = dto.task_status;
            task.task_remarks = dto.task_remarks;
            task.last_updated_by_user_id = dto.last_updated_by_user_id;
            task.last_updated_on = DateTime.Now;

            await _context.SaveChangesAsync();
            return Ok(new
            {
                message = "Task updated successfully",
                task_id = task.task_id
            });
        }
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteTask(int id, [FromQuery] int deletedByUserId)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.task_id == id && !t.is_deleted);

            if (task == null)
                return NotFound("Task not found");

            task.is_deleted = true;
            task.last_updated_by_user_id = deletedByUserId;
            task.last_updated_on = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Task deleted successfully",
                task_id = id
            });
        }


    }
}
