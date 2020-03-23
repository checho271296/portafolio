import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/interfaces/producto.interface';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto : Producto;
  id : string;
  
  constructor(private route: ActivatedRoute, private productoService : ProductosService) { }

  ngOnInit(): void {
    this.route.params.subscribe(parametros =>{
      this.productoService.getProducto(parametros['id'])
      .subscribe((productoDes : Producto )=>{
        this.producto = productoDes;
        this.id = parametros['id'];
      });
    });
  }

}
