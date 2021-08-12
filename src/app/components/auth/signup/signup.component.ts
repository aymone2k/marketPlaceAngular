import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'node-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService) {

              }

  ngOnInit(): void {
  this.signupForm = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  });
  }
  //gérer l'envoie de données
  onSubmit():void{//on reccup les valeurs saisie et on les utilisent pr authentifier le user
 const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    this.auth.signup(email, password)
      .then(()=>{this.router.navigate(['/shop']);})
      .catch((err)=>{this.errorMessage = err.message;})
      console.log(email, password)
  }

}
