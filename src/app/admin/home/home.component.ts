import { Component, ViewChild } from '@angular/core';
import{BreakpointObserver} from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild(MatSidenav) sidenav!:MatSidenav;

  constructor(private observar:BreakpointObserver){

  }
  ngAfterViewInit(){
    this.observar.observe(['(max-width:800px)']).subscribe((res)=>{
      if (res.matches){
        this.sidenav.mode='over'
        this.sidenav.close()
      }
      else{
        this.sidenav.mode='side'
        this.sidenav.open()
      }
    })
  }
}
