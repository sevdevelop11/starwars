import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgCharacterService {

  constructor(private http: HttpClient){}

  loadImages(): Observable<string> {
    const url = `https://akabab.github.io/starwars-api/api/all.json`;
    return this.http.get<any>(url).pipe(
      map(response => {
        if (response && response.length > 0) {
          return response;
        } else {
          return ''; // Devolver un string vacío
        }}));
  }

  getData1(currentPage: number): Observable<any> {
    return this.http.get<any>('https://swapi.dev/api/people/?page=' + currentPage);
  }

  getData2(currentPage: number): Observable<any> {
    return this.http.get<any>('https://akabab.github.io/starwars-api/api/all.json');
  }

  getData(currentPage: number): Observable<any> {
    return forkJoin([this.getData1(currentPage), this.getData2(currentPage)]).pipe(
      map(results => {
        const unifiedResults = [];
        // Objeto para almacenar los resultados por nombre
        const nameMap = new Map<string, any>();

        // Iterar sobre los resultados del primer endpoint
        for (const item of results[0].results) {
          nameMap.set(item.name, item);
        }
        // Iterar sobre los resultados del segundo endpoint
        for (const item of results[1]) {
          // Si el nombre ya existe en el map, combinar los datos
          if (nameMap.has(item.name)) {
            const existingItem = nameMap.get(item.name);
            existingItem.image = item.image;
            unifiedResults.push(existingItem);
          }
        }

        return unifiedResults;
      })
    );
  }


 /* getData(): Observable<any[]> {
    const url1 = 'https://swapi.dev/api/people';
    const url2 = 'https://akabab.github.io/starwars-api/api/all.json';

    const request1 = this.http.get<any[]>(url1);
    const request2 = this.http.get<any[]>(url2);

    return forkJoin([request1, request2]).pipe(
      map(([response1, response2]) => {
        // Unificar las respuestas por el atributo 'name'
        const unifiedData = {};
        response1.forEach(item => {
          unifiedData[item.name] = item;
        });
        response2.forEach(item => {
          if (unifiedData[item.name]) {
            // Si ya existe un elemento con el mismo nombre, fusionar los datos
            Object.assign(unifiedData[item.name], item);
          } else {
            unifiedData[item.name] = item;
          }
        });
        // Convertir el objeto unificado en un array de objetos
        return Object.values(unifiedData);
      })
    );
  }*/
}
