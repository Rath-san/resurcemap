import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ListValueNode } from 'graphql/language';

@Scalar('LatLng', (type) => [])
export class LatLngScalar
  implements CustomScalar<[number, number], [number, number]>
{
  description = 'LatLng custom scalar type';

  parseValue(value: [number, number]): [number, number] {
    return value; // value from the client
  }

  serialize(value: [number, number]): [number, number] {
    return value; // value sent to the client
  }

  parseLiteral(ast: ListValueNode): [number, number] {
    if (ast.kind === Kind.LIST && ast.values.length === 2) {
      return [+ast.values[0], +ast.values[0]];
    }
    return null;
  }
}
