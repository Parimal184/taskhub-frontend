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
    {label: "TODO", value: "TODO"},
    {label: "In Progress", value: "In Progress"},
    {label: "Completed", value: "Completed"}
  ]

  priorityOptions = [
    {label: "High", value: "HIGH"},
    {label: "Medium", value: "MEDIUM"},
    {label: "Low", value: "LOW"}
  ]

  constructor(private route: ActivatedRoute,private fb: FormBuilder, private taskService: TaskService, private userService: UserService, private router: Router) { 
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: [this.priorityOptions[0].value, Validators.required],
      dueDate: ['', Validators.required],
      status: [this.statusOptions[0].value, Validators.required]
    });
  }

  ngOnInit() {

    this.taskId = this.route.snapshot.params['id'];
    if(this.taskId) {
      this.taskService.getTask(this.taskId).
      pipe(first())
      .subscribe(data => {
        console.log("task :::", data);
        this.currentTask = data;
        this.loginUser = this.userService.getLoginUser();
    
        this.taskForm = this.fb.group({
          title: [this.currentTask?.title ? this.currentTask.title : 'Demo', Validators.required],
          description: [this.currentTask?.description ? this.currentTask.description : '', Validators.required],
          priority: [this.currentTask?.priority ? this.currentTask.priority : this.priorityOptions[0].value, Validators.required],
          dueDate: [this.currentTask?.dueDate ? this.currentTask.dueDate : '', Validators.required],
          status: [this.currentTask?.status ? this.currentTask.status : this.statusOptions[0].value, Validators.required]
        });
      });
    }

  }

  saveTask() {
    console.log("taskData :", this.taskData)
    const task: TaskData = this.taskData;
    task.priority = task.priority.toUpperCase();
    task.status = task.status.toUpperCase();
    task.creatorEmail = this.loginUser.email;
    this.taskService.saveTask(this.taskData)
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

  get taskData() { return this.taskForm.value }

}
