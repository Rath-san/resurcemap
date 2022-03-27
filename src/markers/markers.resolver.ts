import { NotFoundException, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Marker } from './models/markers.model';
import { MarkerService } from './markers.service';
import { NewMarkerInput } from './dto/new-marker.args';
import { MarkersArgs } from './dto/markers.args';
import { UpdateMarkerInput } from './dto/update-marker';

@Resolver((of) => Marker)
export class MarkersResolver {
  constructor(private readonly markersService: MarkerService) {}

  @Query((returns) => Marker)
  async marker(@Args('id') id: string): Promise<Marker> {
    const marker = await this.markersService.findOneById(id);
    if (!marker) {
      throw new NotFoundException(id);
    }
    return marker;
  }

  @Query((returns) => [Marker])
  markers(@Args() markersArgs: MarkersArgs): Promise<Marker[]> {
    return this.markersService.findAll(markersArgs);
  }

  @Mutation((returns) => Marker)
  async createMarker(@Args('newMarkerData') newMarkerData: NewMarkerInput) {
    return this.markersService.create(newMarkerData);
  }

  @Mutation((returns) => Marker)
  async updateMarker(
    @Args('id') id: string,
    @Args('updateMarkerData') updateMarkerData: UpdateMarkerInput,
  ) {
    return this.markersService.update(id, updateMarkerData);
  }

  @Mutation((returns) => Marker)
  async removeMarker(@Args('id') id: string) {
    return this.markersService.remove(id);
  }
}
