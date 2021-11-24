import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';


// Los servicios son inyectables, son un singleton, los componentes se rompen en cuando los abandonamos los servicios al ser singleton no.
@Injectable({
  providedIn: 'root'
})
export class AccountService {
	baseurl = environment.apiUrl;
	
	constructor(private http: HttpClient) { }
	private currentUserSource = new ReplaySubject<User>(1);
	currentUser$ = this.currentUserSource.asObservable();

	login(model: any){
	return this.http.post<User>(this.baseurl + "account/login", model).pipe(
		map((response: User) => {
		const user = response;
		if (user) {
			localStorage.setItem("user", JSON.stringify(user));
			this.currentUserSource.next(user);
		}
		})
	)
	}

	register(model: any){
		return this.http.post<User>(this.baseurl + "account/register", model).pipe(
			map((user: User) => {
				if(user) {
					localStorage.setItem("user", JSON.stringify(user));
					this.currentUserSource.next(user);
				}
			})
		)
	}

	setCurrentUser(user: User) {
		this.currentUserSource.next(user);
	}

	logout() {
		localStorage.removeItem("user");
		this.currentUserSource.next(null);
	}

}