import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TaskData } from 'src/app/modal/taskData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  taskData = new TaskData();
  
  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    const now = new Date();
    this.taskData.title = "Demo";
    this.taskData.description = "This is my first task !";
    this.taskData.assignee = "Parimal";
    this.taskData.created = this.datePipe.transform(now, 'MMM d, y \'at\' hh:mm a')!;
    this.taskData.creator = "Test";
    this.taskData.priority = "In Priority";
    this.taskData.dueDate = new Date().toString();
  }
}
