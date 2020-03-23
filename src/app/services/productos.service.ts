import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos : ProductoInterface[] = [] ;

  constructor(private httpClient : HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos(){
    this.httpClient.get('https://angular-html-2cc1c.firebaseio.com/productos_idx.json')
    .subscribe((resp:ProductoInterface[]) =>{
      
      this.productos = resp;
      console.log(this.productos);
      this.cargando = false;
      
    })
  }
}
