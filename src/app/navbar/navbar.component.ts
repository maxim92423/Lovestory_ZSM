import { Component, AfterViewInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ScrollSpyService, ScrollSpyModule } from 'ngx-scrollspy';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {
  public isCollapsed = true;
  @ViewChild('mainNav') mainNav: ElementRef;

  constructor(
    private scrollSpyService: ScrollSpyService,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    console.log('afterviewinit');
     this.scrollSpyService.getObservable('window').subscribe((e: any) => {
        if (e.path[1].scrollY > 200) {
          this.renderer.addClass(this.mainNav.nativeElement, 'navbar-shrink');
        }else {
          this.renderer.removeClass(this.mainNav.nativeElement, 'navbar-shrink');
        }
     });
  }

  CloseMenu() {
    this.isCollapsed = true;
  }

}
