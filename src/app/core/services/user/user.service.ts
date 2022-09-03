import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user && JSON.parse(user);
  }

  createUser(fullName: string): User {
    const user: User = { fullName };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }
}
