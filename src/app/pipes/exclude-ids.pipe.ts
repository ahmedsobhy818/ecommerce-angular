import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excludeIDs',
  pure:false
})
export class ExcludeIDsPipe implements PipeTransform {

  transform(items: any[], ...args: any[]): any {
    let ExecludedList=args[0]
    let inputIdFieldName=args[1]
    let ExecludedIdFieldName=args[2]
    //return null;
    return items.filter(item=>{
      let value=item[inputIdFieldName]
      
     return ExecludedList.filter(c=>{
       return c[ExecludedIdFieldName]==value
      }).length==0
    });
  }

}
