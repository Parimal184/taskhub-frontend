import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(public taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let status = params['status'];
      console.log("query :: ", params['status']);
      if (status) {
        if (status == "in-progress") {
          status = "IN_PROGRESS";
        }
        this.taskService.getTasksByStatus(status);
      } else {
        this.getAllTasks();
      }
    });
  }

  getAllTasks() {
    this.taskService.getAllTasks()
  }

  deleteTask(taskId: number) {
    console.log("task id::", taskId);
    this.taskService.deleteTask(taskId);
  }

  getPriorityClass(currentTask: TaskData): string {
    if (currentTask.priority === "HIGH") {
      return "high";
    } else if (currentTask.priority === "LOW") {
      return "low";
    } else {
      return "medium";
    }
  }
}
