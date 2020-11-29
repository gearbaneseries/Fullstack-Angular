import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ScheduleService } from 'src/app/schedule.service';

@Component({
  selector: 'app-public-schedules-view',
  templateUrl: './public-schedules-view.component.html',
  styleUrls: ['./public-schedules-view.component.css']
})

export class PublicSchedulesViewComponent implements OnInit {

  constructor(private scheduleService: ScheduleService, private route: ActivatedRoute, private router: Router) { }

  lists: any[];
  items: any;
  schedule: string;
  schedule_size: any;
  size: any;
  course_size: number;
  course_title: string;
  flag: string;  
  owner: any;
  description: string;

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
          this.scheduleService.getPublicScheduleItems(params.owner, params.schedule_name).subscribe((items: any) => {

              this.schedule = params.schedule_name; // Selected schedule
              this.owner = params.owner;                

              if (items.array_list == null) {                                    
                  this.size = 0;
                  this.schedule_size = 0;
              }

              else {                                    
                this.items = items.array_list;
                this.course_size = items.array_list.length;
                this.description = items.description;                
                this.schedule_size = 1;     
                this.size = 1;                        
              }               
          })          
      }
    )

    this.scheduleService.getPublicSchedules().subscribe((lists: any[]) => {
        this.lists = lists;                
    })
  }

}