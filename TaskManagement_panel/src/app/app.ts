import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  tasks: any[] = [];
  searchId: number | null = null;
isSearchMode = false;
  constructor(private taskService: TaskService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
  this.taskService.getAllTasks().subscribe({
    next: (data) => {
      this.tasks = data; // assign directly
      console.log('TABLE DATA ', this.tasks);
      this.cd.detectChanges();
    },
    error: (err) => {
      console.error('FULL ERROR ', err);
      alert('Error loading tasks');
    }
  });
}

  trackByTaskId(index: number, task: any) {
  return task.task_id;
}

  newTask = {
  taskTitle: '',
  taskDescription: '',
  taskDueDate:  null as string | null,
  taskStatus: 'Pending',
  taskRemarks: '',
  createdByUserId: 0
};
 createTask() {
  this.taskService.createTask(this.newTask).subscribe({
    next: () => {
      alert('Task Created Successfully ');

     // table refresh
      this.loadTasks();
      this.newTask = {
        taskTitle: '',
        taskDescription: '',
        taskDueDate: '',
        taskStatus: 'Pending',
        taskRemarks: '',
        createdByUserId: 0
      };
    },
    error: (err) => {
      console.error(err);
      alert('Error while creating task...');
    }
  });
}
 isEditMode = false;
editTaskId: number | null = null;
  onEdit(task: any) {

  this.isEditMode = true;
  this.editTaskId = task.task_id;

  this.newTask = {
    taskTitle: task.task_title,
    taskDescription: task.task_description,
    taskDueDate: task.task_due_date?.split('T')[0], // DATE FIX
    taskStatus: task.task_status,
    taskRemarks: task.task_remarks,
    createdByUserId: task.created_by_user_id
  };

  window.scrollTo({ top: 0, behavior: 'smooth' });
}
deleteTask(task: any) {

  const confirmDelete = confirm(
    `Are you sure you want to delete task "${task.task_title}" ?`
  );

  if (!confirmDelete) return;

  const deletedByUserId = 1; // logged-in user id

  this.taskService.deleteTask(task.task_id, deletedByUserId).subscribe({
    next: () => {
      alert('Task Deleted Successfully..!');
      this.loadTasks(); // refresh table
    },
    error: (err) => {
      console.error('DELETE ERROR', err);
      alert('Error while deleting task...');
    }
  });
}
updateTask() {

   if (!this.editTaskId) {
    alert('Task ID missing');
    return;
  }

  const updatePayload = {
     task_id: this.editTaskId, 
    task_title: this.newTask.taskTitle,
    task_description: this.newTask.taskDescription,
      task_due_date: this.newTask.taskDueDate
      ? new Date(this.newTask.taskDueDate).toISOString()
      : null,
     task_status: this.newTask.taskStatus,
    task_remarks: this.newTask.taskRemarks,
    last_updated_by_user_id: 1
  };
 console.log('UPDATE PAYLOAD', updatePayload);
  this.taskService.editTask(updatePayload).subscribe({
    next: () => {
      alert('Task Updated Successfully...!');
      this.resetForm();
      this.loadTasks();
    },
    error: (err) => {
      console.error(err);
      alert('Error while Updating task...');
    }
  });
}
resetForm() {
  this.isEditMode = false;
  this.editTaskId = null;

  this.newTask = {
    taskTitle: '',
    taskDescription: '',
    taskDueDate: null,
    taskStatus: 'Pending',
    taskRemarks: '',
    createdByUserId: 0
  };
}

cancelEdit() {
  this.resetForm();
}

  searchById() {
  if (!this.searchId) {
    alert('Please enter Task ID');
    return;
  }

  this.taskService.getTaskById(this.searchId).subscribe({
    next: (data) => {
      this.tasks = [data]; // single object ko array me convert
      this.isSearchMode = true;
    },
    error: () => {
      alert('Task not found');
      this.tasks = [];
    }
  });

}
}
