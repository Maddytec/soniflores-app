import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared/services/shared.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    showTemplate: boolean = false;

public shared: SharedService;
    
    constructor() {
    this.shared = SharedService.getInstance();
    }

    ngOnInit(){
        this.shared.showTemplate.subscribe(
            show => this.showTemplate = show
        );
    }
}
