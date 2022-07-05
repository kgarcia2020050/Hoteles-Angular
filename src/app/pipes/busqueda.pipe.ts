import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busqueda',
})
export class BusquedaPipe implements PipeTransform {
  transform(users: any, search: any) {
    if (!search) {
      return users;
    } else {
      return users.filter((user) => {
        return user.nombre.toLowerCase().includes(search.toLowerCase());
      });
    }
  }
}
