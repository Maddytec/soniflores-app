import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../shared/model/user.model';
import { SharedService } from '../../shared/services/shared.service';
import { UserService } from '../../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from '../../shared/model/response-api';
import { routerTransition } from '../../router.animations';
import { CurrentUser } from '../../shared/model/current-user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [routerTransition()]
})
export class UserComponent implements OnInit {


  @ViewChild("form")
  form: NgForm;

  user = new User('', '', '', '','');

  shared: SharedService;
  message: {};
  classCss: {};

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id: string = this.route.snapshot.params['id'];
    if (id != undefined) {
      this.findById(id);
    }
  }

  findById(id: string) {
    this.userService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.user = responseApi.data;
      this.user.password = '';
    },
      err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
  }

  register() {
    this.message = {};
    this.userService.createOrUpdate(this.user).subscribe((user: User) => {
      this.user = new User('','','','','');
      this.form.resetForm();
       this.showMessage({
       type: 'success',
       text: `Registered ${user.email} successfully`
      });
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  private showMessage(message: { type: string, text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 8000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-' + type] = true;
  }

  getFormGroupClass(isInvalid: boolean, isDirty): {} {
    return {
        'form-group': true,
        'has-error': isInvalid && isDirty,
        'has-success': !isInvalid && isDirty
    };
}

}
