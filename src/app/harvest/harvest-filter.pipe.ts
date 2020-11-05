import { Pipe, PipeTransform } from '@angular/core';
import {HarvestDto} from '../models/harvest-dto';

@Pipe({
  name: 'harvestFilter'
})
export class HarvestFilterPipe implements PipeTransform {

  transform(dtos: HarvestDto[], minUsdAmount: number): HarvestDto[] {
    if (!dtos || !minUsdAmount) {
      return dtos;
    }
    return dtos.filter(dto => dto.usdAmount > minUsdAmount);
  }

}
