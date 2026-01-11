import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private apiUrl = '/api/Tasks/Get';
   private apiUrlbyid = '/api/Tasks/GetById';
  

  constructor(private http: HttpClient) { }
   // GET ALL TASKS
  getAllTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  // get Tasks by Id
  getTaskById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlbyid}/${id}`);
  }
  //Create Task
  createTask(taskData: any): Observable<any> {
    return this.http.post('/api/Tasks/Create', taskData);
  }
  // Edit Task
  editTask(taskData1:any): Observable<any> {
     return this.http.post('/api/Tasks/Update',taskData1);
  }
  // Delete Task
  deleteTask(taskId: number, deletedByUserId: number): Observable<any> {
    return this.http.delete(`/api/Tasks/Delete/${taskId}?deletedByUserId=${deletedByUserId}`);
  }
}
