import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { User } from '../shared/model/user.model';
import { SharedService } from '../shared/services/shared.service';
import { UserService } from '../shared/services/user.service';
import { CurrentUser } from '../shared/model/current-user.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent {

    name: string = '';
    user = new User('', '', '', '',null);
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
            this.shared.senha = 'Bearer ' + userAuthentication.senha;
            this.shared.user = new User(null,null, userAuthentication.email, userAuthentication.senha, userAuthentication.grupos)
            this.shared.showTemplate.emit(true);
            this.router.navigate(['/']);
        }, err => {
            this.shared.senha = null;
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
