import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsPageComponent } from '../gifs-page/gifs-page.component';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {} //injectamos el servicio(todas sus propiedades y metodos para poder usarlos aqui)

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;

    //validacion= valor limpiame espacios vacios al inicio y al final/.lengh consulta el largo del string si es estrictamente 0= vacio entonces no hagas nada solo regresa a esta funcion
    if (valor.trim().length === 0) {
      return;
    }
    this.gifsService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = '';
  }
}
