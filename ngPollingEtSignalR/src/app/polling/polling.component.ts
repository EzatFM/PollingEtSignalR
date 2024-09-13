import { UselessTask } from './../models/UselessTask';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-polling',
  templateUrl: './polling.component.html',
  styleUrls: ['./polling.component.css']
})
export class PollingComponent implements OnInit {

  title = 'labo.signalr.ng';
  tasks: UselessTask[] = [];
  taskname: string = "";

  urlApi = "https://localhost:7289/api";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.updateTasks();
  }

  async complete(id: number) {
    // TODO On invoke la méthode pour compléter une tâche sur le serveur (Contrôleur d'API)
    return await lastValueFrom(this.http.get<any>(this.urlApi + "/UselessTasks/Complete/" + id));
  }

  async addtask() {
    // TODO On invoke la méthode pour ajouter une tâche sur le serveur (Contrôleur d'API)
    this.tasks.push(await lastValueFrom(this.http.post<UselessTask>(this.urlApi + "/UselessTasks/Add?taskText=" + this.taskname, null)));
  }

  async updateTasks() {
    // TODO: Faire une première implémentation simple avec un appel au serveur pour obtenir la liste des tâches
    // TODO: UNE FOIS QUE VOUS AVEZ TESTER AVEC DEUX CLIENTS: Utiliser le polling pour mettre la liste de tasks à jour chaque seconde
    this.tasks = await lastValueFrom(this.http.get<UselessTask[]>(this.urlApi + "/UselessTasks/GetAll"));
    setTimeout(() => { this.updateTasks() }, 1000);
  }
}
