import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { TaskData } from '../modal/taskData';
import { Constants } from '../modal/constants';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private cachedDataSubject = new BehaviorSubject<any[]>([]);
  cachedData$: Observable<any[]> = this.cachedDataSubject.asObservable();

  constructor(private httpService: HttpService) { }

  saveTask(taskData: TaskData): Observable<any> {
    console.log("task data:", taskData)
    return this.httpService.postBody(Constants.TASK_SAVE, taskData);
  }

  getAllTasks() {
    this.httpService.get(Constants.ALL_TASKS + "/all").subscribe(data => {
      this.cachedDataSubject.next(data.tasks);
    });
  }

  getTasksByStatus(status: string) {
    this.httpService.get(Constants.ALL_TASKS + "/" + status).subscribe(data => {
      this.cachedDataSubject.next(data.tasks);
    });
  }

  deleteTask(taskId: number) {
    this.httpService.delete(Constants.DELETE_TASK, taskId).subscribe(() => {
      this.resetCachedData();
      this.getAllTasks();
    });
  }

  getTask(taskId: number): Observable<any> {
    return this.httpService.getWithParam(Constants.GET_TASK, taskId);
  }

  resetCachedData() {
    this.cachedDataSubject.next([]);
  }

}
