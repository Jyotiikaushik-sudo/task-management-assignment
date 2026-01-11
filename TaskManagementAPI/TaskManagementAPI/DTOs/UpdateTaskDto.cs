using System.ComponentModel.DataAnnotations;

namespace TaskManagementAPI.DTOs
{
    public class UpdateTaskDto
    {
        [Required]
        public int task_id { get; set; }

        public string task_title { get; set; }
        public string task_description { get; set; }
        public DateTime task_due_date { get; set; }
        public string task_status { get; set; }
        public string task_remarks { get; set; }

        [Required]
        public int last_updated_by_user_id { get; set; }
    }
}
