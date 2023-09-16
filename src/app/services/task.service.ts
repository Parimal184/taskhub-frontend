import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { TaskData } from '../modal/taskData';
import { Constants } from '../modal/constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { UserDetails } from '../modal/user-details';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private cachedDataSubject = new BehaviorSubject<any[]>([]);
  cachedData$: Observable<any[]> = this.cachedDataSubject.asObservable();
  loginUser!: any;

  constructor(private httpService: HttpService, private userService: UserService) { 
    this.loginUser = this.userService.getLoginUser();
    console.log("login in task ::", this.loginUser)
  }

  saveTask(taskData: TaskData): Observable<any> {
    console.log("task data:", taskData)
    return this.httpService.postBody(Constants.TASK_SAVE, taskData);
  }

  getAllTasks() {
    this.httpService.getWithParam(Constants.ALL_TASKS + "/all", this.loginUser.id).subscribe(data => {
      this.cachedDataSubject.next(data.tasks);
    });
  }

  getTasksByStatus(status: string) {
    this.httpService.getWithParam(Constants.ALL_TASKS + "/" + status, this.loginUser.id).subscribe(data => {
      this.cachedDataSubject.next(data.tasks);
    });
  }

  clearCacheSubject() {
    this.cachedDataSubject.next([]);
  }

  deleteTask(taskId: number) {
    this.httpService.delete(Constants.DELETE_TASK, taskId).subscribe(() => {
      this.getAllTasks();
    });
  }

  getTask(taskId: number): Observable<any> {
    return this.httpService.getWithParam(Constants.GET_TASK, taskId);
  }

}
