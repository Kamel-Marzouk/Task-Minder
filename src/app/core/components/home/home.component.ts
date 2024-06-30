import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events: string[] = [];
  opened: boolean = true;
  items: any[] = [
    {
      key: "/dashboard",
      title: "dashboard",
      iconSrc: "dashboard",
      active: false
    },
    {
      key: "/projects",
      title: "projects",
      iconSrc: "projects",
      active: false
    },
    {
      key: "/tasks",
      title: "tasks",
      iconSrc: "tasks",
      active: true
    },
    {
      key: "/calender",
      title: "calender",
      iconSrc: "calender",
      active: false
    },
  ];

  constructor(
    private authenticationService: AuthenticationService,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    public translation: TranslationService
  ) { }

  ngOnInit(): void {
    this.convertToSvgIcon();
  }

  private convertToSvgIcon(): void {
    this.matIconRegistry.addSvgIcon(
      'tasks',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/tasks.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'projects',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/projects.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'calender',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/calender.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'dashboard',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/dashboard.svg')
    );
  }

  public logout(): void {
    this.authenticationService.logout();
  }

}
