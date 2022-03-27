import { Module } from '@nestjs/common';
import { MarkersResolver } from './markers.resolver';
import { MarkerService } from './markers.service';

@Module({
  providers: [MarkersResolver, MarkerService],
})
export class MarkersModule {}
