import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
	
	title = 'The Dating App';
	users: any; //Desactivo la seguridad de tipado, users puede ser cualquier tipo, temporal.

	constructor(private accountService: AccountService){}

	//Basicamente se ejcuta luego del construtor
	ngOnInit(){
		this.setCurrentUser();
	}

	setCurrentUser(){
		const user: User = JSON.parse(localStorage.getItem("user"));
		this.accountService.setCurrentUser(user);
	}

}
