import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeof',
})
export class TypeofPipe implements PipeTransform {
  transform(value: unknown): unknown {
    return typeof value;
  }
}
