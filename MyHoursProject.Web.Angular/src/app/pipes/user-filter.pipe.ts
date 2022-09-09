import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../classes/project';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(value: User[] | undefined, ...args: any[]): User[] | undefined {
    let searchFilter: string = args[0]?.toLowerCase();

    return (!searchFilter || !value) ? value : value.filter(x => {
      return x.FullName.toLowerCase().includes(searchFilter);
    });
  }

}
