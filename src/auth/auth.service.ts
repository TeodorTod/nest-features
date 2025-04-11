import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  isAuthenticated: boolean = false;

  // login(email: string, password: string) {
  //   const user = this.usersService.users.find(
  //     (u) => u.email === email && u.password === password,
  //   );
  //   if (!user) return 'User does not exist';
  //   this.isAuthenticated = true;
  //   return 'MY_TOKEN';
  // }
}
