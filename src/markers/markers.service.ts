import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { DB } from 'src/db/db';
import { MarkersArgs } from './dto/markers.args';
import { NewMarkerInput } from './dto/new-marker.args';
import { Marker } from './models/markers.model';
import { v4 as uuidv4 } from 'uuid';
import { UpdateMarkerInput } from './dto/update-marker';

// DUMMY DATA
const MARKERS: Marker[] = [
  {
    id: uuidv4(),
    icon: 'mining',
    latLng: [-261.375, 268.25],
    name: 'some name',
    nodeType: 'mining',
    createdAt: new Date(),
    deletedAt: null,
  },
  {
    id: uuidv4(),
    icon: 'logging',
    latLng: [-272.25, 289.0625],
    name: 'some name',
    nodeType: 'mining',
    createdAt: new Date(),
    deletedAt: null,
  },
  {
    id: uuidv4(),
    icon: 'harvesting',
    latLng: [-281.75, 273.25],
    name: 'some name',
    nodeType: 'harvesting',
    createdAt: new Date(),
    deletedAt: null,
  },
];

const isDeleted = (object: any): boolean => {
  return object['deletedAt'] !== null;
};

@Injectable()
export class MarkerService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: DB,
  ) {}

  async create(data: NewMarkerInput): Promise<Marker> {
    // const response = await this.db.save({
    //   id: uuidv4(),
    //   test1: data.firstName,
    //   test2: data.lastName,
    // });

    const newMarker: Marker = {
      id: uuidv4(),
      icon: data.icon,
      latLng: data.latLng,
      name: data.name,
      nodeType: data.nodeType,
      createdAt: new Date(),
      deletedAt: null,
    };

    MARKERS.push(newMarker);

    return newMarker;
  }

  async update(id: string, data: UpdateMarkerInput): Promise<Marker> {
    // const response = await this.db.save({
    //   id: uuidv4(),
    //   test1: data.firstName,
    //   test2: data.lastName,
    // });

    const index = MARKERS.findIndex((entry) => entry.id === id);

    if (index < 0 || index === undefined) {
      throw new NotFoundException(id);
    } else {
      const updatedMarker = {
        ...MARKERS[index],
        ...data,
      };

      return (MARKERS[index] = updatedMarker);
    }
  }

  async findOneById(id: string): Promise<Marker> {
    // return this.db.getRow(+id);
    return MARKERS.find((entry) => entry.id === id);
    // return this.makeAuthor(dbResponse);
  }

  async findAll(markersArgs?: MarkersArgs): Promise<Marker[]> {
    // return this.db.getRows();
    return MARKERS.filter((entry) => !isDeleted(entry));
  }

  async remove(id: string): Promise<Marker> {
    const index = MARKERS.findIndex((entry) => entry.id === id);

    if (index < 0 || index === undefined) {
      throw new NotFoundException(id);
    } else {
      MARKERS[index].deletedAt = new Date();
      return MARKERS[index];
    }
  }
}
