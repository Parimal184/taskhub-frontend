import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { TaskData } from '../modal/taskData';
import { Constants } from '../modal/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpService: HttpService) { }

  saveTask(taskData: TaskData): Observable<any> {
    console.log("task data:", taskData)
    return this.httpService.postBody(Constants.TASK_SAVE, taskData);
  }

}
