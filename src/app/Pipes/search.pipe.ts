import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(notes: any[], searchTerm:string): any {
    if(searchTerm == undefined){
      return notes;
    }
    else{
      return notes.filter(function(notes) {
        return notes.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
  }

}
