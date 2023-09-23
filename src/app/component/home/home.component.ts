import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskData } from 'src/app/modal/taskData';
import { ModalService } from 'src/app/services/modal.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  taskData = new TaskData();
  tasks: TaskData[] = [
    {
      id: 1,
      title: "Task 1",
      description: "Task1 Description !!",
      status: "IN_PROGRESS",
      priority: "HIGH",
      created: "2023-09-22",
      updated: "2023-09-23",
      dueDate: "2023-09-30",
      creatorEmail: "prmltndl@gmail.com"
    },
    {
      id: 1,
      title: "Task 1",
      description: "Task1 Description !!",
      status: "IN_PROGRESS",
      priority: "HIGH",
      created: "2023-09-22",
      updated: "2023-09-23",
      dueDate: "2023-09-30",
      creatorEmail: "prmltndl@gmail.com"
    },
    {
      id: 1,
      title: "Task 1",
      description: "Task1 Description !!",
      status: "IN_PROGRESS",
      priority: "HIGH",
      created: "2023-09-22",
      updated: "2023-09-23",
      dueDate: "2023-09-30",
      creatorEmail: "prmltndl@gmail.com"
    },
    {
      id: 1,
      title: "Task 1",
      description: "Task1 Description !!",
      status: "IN_PROGRESS",
      priority: "HIGH",
      created: "2023-09-22",
      updated: "2023-09-23",
      dueDate: "2023-09-30",
      creatorEmail: "prmltndl@gmail.com"
    },
    {
      id: 1,
      title: "Task 1",
      description: "Task1 Description !!",
      status: "IN_PROGRESS",
      priority: "HIGH",
      created: "2023-09-22",
      updated: "2023-09-23",
      dueDate: "2023-09-30",
      creatorEmail: "prmltndl@gmail.com"
    },
    {
      id: 1,
      title: "Task 1",
      description: "Task1 Description !!",
      status: "IN_PROGRESS",
      priority: "HIGH",
      created: "2023-09-22",
      updated: "2023-09-23",
      dueDate: "2023-09-30",
      creatorEmail: "prmltndl@gmail.com"
    },
    {
      id: 1,
      title: "Task 1",
      description: "Task1 Description !!",
      status: "IN_PROGRESS",
      priority: "HIGH",
      created: "2023-09-22",
      updated: "2023-09-23",
      dueDate: "2023-09-30",
      creatorEmail: "prmltndl@gmail.com"
    },
    {
      id: 1,
      title: "Task 1",
      description: "Task1 Description !!",
      status: "IN_PROGRESS",
      priority: "HIGH",
      created: "2023-09-22",
      updated: "2023-09-23",
      dueDate: "2023-09-30",
      creatorEmail: "prmltndl@gmail.com"
    },
    {
      id: 1,
      title: "Task 1",
      description: "Task1 Description !!",
      status: "IN_PROGRESS",
      priority: "HIGH",
      created: "2023-09-22",
      updated: "2023-09-23",
      dueDate: "2023-09-30",
      creatorEmail: "prmltndl@gmail.com"
    },
    {
      id: 1,
      title: "Task 1",
      description: "Task1 Description !!",
      status: "IN_PROGRESS",
      priority: "HIGH",
      created: "2023-09-22",
      updated: "2023-09-23",
      dueDate: "2023-09-30",
      creatorEmail: "prmltndl@gmail.com"
    }
  ];
  

  constructor(private taskModalService: ModalService, public taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let status = params['status'];
      if (status) {
        if (status == "executing") {
          status = "in_progress";
        } else if (status == "planned") {
          status = "todo";
        } else {
          status = "completed";
        }
        this.taskService.getTasksByStatus(status);
      } else {
        this.getAllTasks();
        this.taskService.cachedData$.subscribe((tasks) => {
          // this.tasks = tasks;
        })
      }
    });
  }

  openTaskModal(taskId: number) {
    this.taskModalService.openTaskModal(taskId);
  }

  getAllTasks() {
    this.taskService.getAllTasks()
  }

  deleteTask(taskId: number) {
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
