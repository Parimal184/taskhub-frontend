import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { TaskData } from 'src/app/modal/taskData';
import { UserDetails } from 'src/app/modal/user-details';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task!: any;

  taskForm!: FormGroup;
  loginUser!: UserDetails;
  taskId!: number;
  currentTask!: TaskData;

  statusOptions = [
    { label: "TODO", value: "TODO" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Completed", value: "COMPLETED" }
  ]

  priorityOptions = [
    { label: "High", value: "HIGH" },
    { label: "Medium", value: "MEDIUM" },
    { label: "Low", value: "LOW" }
  ]

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private taskService: TaskService, private userService: UserService, private router: Router) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: [this.priorityOptions[0].value, Validators.required],
      dueDate: ['', Validators.required],
      status: [{ value: this.statusOptions[0].value, disabled: true }, Validators.required]
    });
  }

  ngOnInit() {

    this.loginUser = this.userService.getLoginUser();
    this.taskId = this.route.snapshot.params['id'];
    console.log("task id :", this.taskId)
    if (this.taskId) {
      this.taskService.getTask(this.taskId).
        pipe(first())
        .subscribe(data => {
          console.log("task :::", data);
          this.currentTask = data;

          this.taskForm = this.fb.group({
            title: [this.currentTask?.title ? this.currentTask.title : 'Demo', Validators.required],
            description: [this.currentTask?.description ? this.currentTask.description : '', Validators.required],
            priority: [this.currentTask?.priority ? this.currentTask.priority : this.priorityOptions[0].value, Validators.required],
            dueDate: [this.currentTask?.dueDate ? new Date(this.currentTask.dueDate).toISOString().substring(0, 10) : '', Validators.required],
            status: [this.currentTask?.status ? this.currentTask.status : this.statusOptions[0].value, Validators.required]
          });
        });
    }

  }

  saveTask() {
    console.log("taskData :", this.taskData)
    const task: TaskData = this.taskData;
    task.id = this.taskId;
    if (task.status) {
      task.status = task.status.toUpperCase();
    }
    task.priority = task.priority.toUpperCase();
    task.creatorEmail = this.loginUser.email;
    this.taskService.saveTask(task)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.taskService.resetCachedData();
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log("error :", error);
        }
      });
  }

  deleteTask() {
    this.taskService.deleteTask(this.currentTask.id);
    this.router.navigate(["/"]);
  }

  get taskData() { return this.taskForm.value }

}
