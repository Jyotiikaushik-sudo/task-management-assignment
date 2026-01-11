using System.ComponentModel.DataAnnotations;

namespace TaskManagementAPI.Model
{
    public class TaskItem
    {
        [Key]
        public int task_id { get; set; }

        public string task_title { get; set; }
        public string task_description { get; set; }
        public DateTime task_due_date { get; set; }
        public string task_status { get; set; }
        public string task_remarks { get; set; }

        public DateTime created_on { get; set; }
        public DateTime? last_updated_on { get; set; }

        public int created_by_user_id { get; set; }
        public int? last_updated_by_user_id { get; set; }

        public bool is_deleted { get; set; }
    }
}
