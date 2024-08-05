import {Component, OnInit} from '@angular/core';
import {User} from "../model/user.model";
import {UserService} from "../user.service";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent implements OnInit {

  user!: User;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = new User();
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.convertFileToBase64(file).then((base64: string) => {
        this.user.avatar = base64;
      });
    }
  }

  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  //todo set status, instId, check base64 encoding
  createUser(): void {
    this.userService.createUser(this.user).subscribe({
      next: response => {
        console.log('User created successfully:', response);
        // Handle successful user creation
      },
      error: error => {
        console.error('Error creating user:', error);
        // Handle error
      }
    });
  }

}
