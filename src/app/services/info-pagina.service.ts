import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info : InfoPagina = {};
  cargada = false;
  equipo : any[];

  constructor(private httpCliente : HttpClient) { 
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    this.httpCliente.get('assets/data/data-pagina.json')
      .subscribe((resp:InfoPagina) => {
        this.cargada = true;
        this.info = resp;
        
      });
  }

  private cargarEquipo(){
      this.httpCliente.get('https://angular-html-2cc1c.firebaseio.com/equipo.json')
      .subscribe((resp:any[])=>{
        this.equipo = resp;
      })
  }
}
