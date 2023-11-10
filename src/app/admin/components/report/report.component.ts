import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModeratorService } from 'src/app/services/moderator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  report:any
  item:any
  action=''
  resolved=false
  constructor(private mod:ModeratorService, private route:ActivatedRoute){}
  ngOnInit(){
    let id = '';
    this.route.params.subscribe((params) => {
      id = params['report_id'];
    });
    if(id){
      this.mod.getReport(id).subscribe({
        next:(res)=>{
          this.report=res.report
          this.resolved=res.report.resolved
          this.item = res.report.book_id || res.report.artwork_id || res.report.chapter_id
        }
      })
    }
  }

  submit(){
    if(this.action==''){
      Swal.fire({
        icon: 'error',
        title: 'Miising Fields',
        text: `You havent added all details to resolve the report!`,
        showConfirmButton: false,
      })
      return
    }
    const data = {
      action:this.action,
      resolved:true,
      resolved_date:Date.now()
    }
    this.mod.resolveReport(this.report.report_id,data).subscribe({
      next:(res)=>{
        console.log(res)
        Swal.fire('Report resolved succesfully!', '', 'success')
        this.ngOnInit()
      },
      error:()=>{
        Swal.fire('An error occured!', '', 'error')
      }
    })
  }

}
