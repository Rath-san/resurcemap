import { Module } from '@nestjs/common';
import { DateScalar } from './scalars/dateScalar';

@Module({
  providers: [DateScalar],
})
export class CommonModule {}
