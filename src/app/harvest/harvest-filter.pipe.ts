import {Pipe, PipeTransform} from '@angular/core';
import {HarvestDto} from '../models/harvest-dto';

@Pipe({
  name: 'harvestFilter'
})
export class HarvestFilterPipe implements PipeTransform {

  transform(dtos: HarvestDto[], minUsdAmount: number, vault: string): HarvestDto[] {
    if (!dtos || (!minUsdAmount && !vault)) {
      return dtos;
    }
    return dtos.filter(dto => dto.usdAmount > minUsdAmount && (!vault || vault === 'all' || dto.vault === vault));
  }

}
