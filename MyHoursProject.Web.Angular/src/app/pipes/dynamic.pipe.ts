import { Pipe, PipeTransform, Injector, Type } from '@angular/core';

@Pipe({
  name: 'dynamicPipe',
  pure: true
})
export class DynamicPipe implements PipeTransform {

  constructor(private injector: Injector) {}

  transform(value: any, requiredPipe: Type<any>, pipeArgs: any): any {
    const injector = Injector.create({
      name: 'DynamicPipe',
      parent: this.injector,
      providers: [
        { provide: requiredPipe }
      ]
    })
    const pipe = injector.get(requiredPipe)
    return pipe.transform(value, pipeArgs);
  }

}
