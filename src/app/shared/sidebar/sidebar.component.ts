import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';
import { BusquedaComponent } from '../../gifs/busqueda/busqueda.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) {} //injectamos el servicio(todas sus propiedades y metodos para poder usarlos aqui)

  // esta funcion la estoy ocupando en el sidebar.componetn.html
  get insetar() {
    return this.gifsService.historial; // al ejecutar esta funcion voy a retornar el valor de "historial" del servicio
  }

  buscar(val: string) {
    this.gifsService.buscarGifs(val);
  }
}
