import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private taskService: TaskService, private userService: UserService) { }

  ngOnInit() {
    this.loginUser = this.userService.getLoginUser();
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  saveTask() {
    console.log("taskData :", this.taskData)
    const task: TaskData = this.taskData;
    task.creatorEmail = this.loginUser.email;
    this.taskService.saveTask(this.taskData).
    subscribe({
      next: (response) => {
        console.log("respo ::", response);
      }
    });
  }

  get taskData() { return this.taskForm.value }

}
