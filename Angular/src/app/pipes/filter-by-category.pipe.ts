import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(movies: any[], catIds:number[]): any[] {
    if(catIds.length>0) {
      return movies.filter(movie => {
        let intersect = movie.categories.filter((cat:any) => catIds.includes(cat.id));
        if (intersect.length > 0) {
          return true;
        }
        return false;
      })
    }
    return movies;
  }

}
