import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/productos.interface';



@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos : ProductoInterface[] = [] ;
  productosFiltrado : ProductoInterface[] = [];

  constructor(private httpClient : HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos(){

    return new Promise((resolve,reject) =>{
      this.httpClient.get('https://angular-html-2cc1c.firebaseio.com/productos_idx.json')
        .subscribe((resp:ProductoInterface[]) =>{
        this.productos = resp;
        this.cargando = false;
        resolve();
    })
    });
    
  }

  getProducto(id: string){
    return this.httpClient.get(`https://angular-html-2cc1c.firebaseio.com/productos/${id}.json`)
  }

  buscarProducto(termino : string){

    if(this.productos.length === 0){
      // esperar a que los productos carguen
      this.cargarProductos().then(()=>{
        //se va ejectutar despues de tener los productos
        //ejecutar filtro
        this.filtrarProdutos(termino);
      });
    }else{
      //se puede aplicar el filtro
      this.filtrarProdutos(termino);
    }
    
  }

  private filtrarProdutos(termino : string){
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach(prod =>{
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if(prod.categoria.indexOf(termino)>= 0 || tituloLower.indexOf(termino) >= 0){
        this.productosFiltrado.push(prod);
      }
    });
      
  }
}
