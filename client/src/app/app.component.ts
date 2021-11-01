import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
	
	title = 'The Dating App';
	users: any; //Desactivo la seguridad de tipado, users puede ser cualquier tipo, temporal.

	constructor(private http: HttpClient){}

	//Basicamente se ejcuta luego del construtor
	ngOnInit(){
	this.getUsers();
	}

	getUsers(){
	this.http.get("https://localhost:5001/api/users").subscribe(response => {
		this.users = response;
	}, error => {
		console.log(error);
	})
	}

}
