import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGIFResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'A6TH9M8tTV8BVE46EKE6CFfuL9fitpTZ';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial]; // operador Spred [...] es Genereame una copia de el original pero en caso de que se modifique este, que no se modifique el original, si no que solo la copia(copia)
  }

  constructor(private http: HttpClient) {
    // de esta manera estamos trayendo la data almacenada en el storage ya que el constructor solo se va a usar una vez cada que la app se actualize
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []; //JSON.parse revertira lo que hizo  JSON.stringify()/ getItem() me devolvera el value asociado a la key que le asigne 'historial' / es para ignorar el nivel estricto de typescript y que confie en lo que hacemos / =[] si el historial es null entonces devuelveme un array vacio
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  } // inyectamos el modulo

  buscarGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase(); //alidacion: al "query" quitale los espacios iniciales y finales y convierte todo a mayusculas
    //validacion: si ! NO incluye el valor entonces añadelo y recorta el arreglo
    //! negacion, include() determina si el valor ya esta en el arreglo devolviendo un valor booleano
    if (!this._historial.includes(query)) {
      this._historial.unshift(query); //unshift inserta elementos al array al inicio
      this._historial = this._historial.splice(0, 10); //splice es para limitar los elemtos de un array

      localStorage.setItem('historial', JSON.stringify(this._historial)); //stringify() me convierte cualquier objeto de javascript en una cadena de texto JSON
    }

    const params = new HttpParams() //se importo la clase "httpParams" que funciona para serializar los parametros de la peticion https y de esta manera tenerlos mejor organizados
      .set('api_key', this.apiKey) // esta es la llave de la api
      .set('limit', '10') // este este el numero limite de informacion que obtendremos
      .set('q', query); //es lo que el usuario busca textualmente

    // http es de tipo HttpCliente  osea que tiene las funcionalidades del modulo que importamos osea que mediante el metodo get voy a traer la informacion del liga y le añadi el $query para cambiar el texto de la busqueda
    this.http
      .get<SearchGIFResponse>(`${this.servicioUrl}/search`, { params })

      .subscribe((resp) => {
        // el subscribe se ejecutara cuando tengamos la respuesta del get y obtendremos una respuesta "resp"
        console.log(resp);
        this.resultados = resp.data;

        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
