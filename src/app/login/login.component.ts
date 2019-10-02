import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { User } from '../shared/model/user.model';
import { SharedService } from '../shared/services/shared.service';
import { UserService } from '../shared/services/user.service';
import { CurrentUser } from '../shared/model/current-user.model';
import { FormsModule } from '@angular/forms';
import { BootstrapOptions } from '@angular/core/src/application_ref';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent {

    name: string = "Madson"
    user = new User('', '', '', '');
    shared: SharedService;
    message: string;

    constructor(
        private userService: UserService,
        private router: Router
    ) {
        this.shared = SharedService.getInstance();
    }

    onLoggedin() {
        this.message = '';
        this.userService.login(this.user).subscribe((userAuthentication: CurrentUser) => {
            this.shared.password = userAuthentication.password;
            this.shared.user = new User(null, userAuthentication.email, userAuthentication.password, userAuthentication.role)
            this.shared.showTemplate.emit(true);
            this.router.navigate(['/']);
        }, err => {
            this.shared.password = null;
            this.shared.user = null;
            this.shared.showTemplate.emit(false);
            this.message = 'Erro';
        })

    }

    cancelLogin() {
        this.message = '';
        this.user = null;
        window.location.href = '/login';
        window.location.reload();
    }

    getFormGroupClass(isInvalid: boolean, isDirty): {} {
        return {
            'form-group': true,
            'has-error': isInvalid && isDirty,
            'has-success': !isInvalid && isDirty
        };
    }
}
