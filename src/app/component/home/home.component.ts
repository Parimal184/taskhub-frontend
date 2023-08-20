import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TaskData } from 'src/app/modal/taskData';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  taskData = new TaskData();
  tasks!: TaskData[];
  
  constructor(public taskService: TaskService) {}

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAllTasks()
  }

  getPriorityClass(currentTask: TaskData): string {
    if(currentTask.priority === "HIGH") {
      return "high";
    } else if(currentTask.priority === "LOW") {
      return "low";
    } else {
      return "medium";
    }
  }
}
