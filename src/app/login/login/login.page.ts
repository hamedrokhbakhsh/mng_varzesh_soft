import {Component, OnInit} from '@angular/core';
import {AppServiceService} from '../../services/app-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MenuController, ViewWillEnter} from "@ionic/angular";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit , ViewWillEnter {

    private form: FormGroup;
    loading = false;
    sSubmit = false;
    err = false ;
    constructor(public menuCtrl: MenuController ,private service: AppServiceService, private fb: FormBuilder ,  private router: Router) {

        this.form = this.fb.group({
            user_name: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    ngOnInit() {

    }
    ionViewWillEnter() {
        this.menuCtrl.enable(false);
    }

     login() {
        this.sSubmit = true;
        if (this.form.valid) {
                this.loading = true;
                const res =  this.service.authUser(this.form.value).subscribe(
                    res => {
                        if (res.status){

                            this.service.storeUserId(res.SystemUserID , res.Name);
                            this.router.navigate(['/home']);
                            console.log(res.Name) ;
                            this.loading = false ;
                        }
                        else {
                            this.err = true ;
                            this.loading = false ;

                        }
                    } ,
                    err => {
                        this.loading = false ;

                    }

        );
        }
    }
}
