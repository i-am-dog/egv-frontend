import {Pipe, PipeTransform} from '@angular/core';
import {UniswapDto} from '../models/uniswapDto';

@Pipe({
  name: 'uniswapFilter'
})
export class UniswapFilterPipe implements PipeTransform {

  transform(dtos: UniswapDto[], minAmount: number): UniswapDto[] {
    if (!dtos || !minAmount) {
      return dtos;
    }
    return dtos.filter(dto => dto.amount > minAmount);
  }

}
