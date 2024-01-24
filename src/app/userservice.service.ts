
import { Injectable } from '@angular/core';


@Injectable({
 providedIn: 'root'
})
export class UserService {
 private apiUrl = 'http://127.0.0.1:8000/api/users/';
 private loginUrl = 'http://127.0.0.1:8000/api/login'; 

 constructor()  { }


 async createUser(account: any) {
  return await fetch(this.apiUrl, {    
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(account)

  })
}

async login (account: any) {

  let response = await fetch(this.loginUrl, {     
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(account)
});

return response; 
}
}






