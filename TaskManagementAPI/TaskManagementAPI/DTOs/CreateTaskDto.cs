namespace TaskManagementAPI.DTOs
{
    public class CreateTaskDto
    {
        public string TaskTitle { get; set; }
        public string TaskDescription { get; set; }
        public DateTime TaskDueDate { get; set; }
        public string TaskStatus { get; set; }
        public string TaskRemarks { get; set; }
        public int CreatedByUserId { get; set; }
    }
}
