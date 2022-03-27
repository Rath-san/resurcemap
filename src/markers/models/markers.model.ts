import { Field, ID, ObjectType, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Marker {
  @Field((type) => ID)
  id: string;

  // user added name its a custom string
  @Field({ nullable: true })
  name?: string;

  // node type ex `mining`, `logging`
  @Field({ nullable: true })
  nodeType?: string;

  @Field({ nullable: true })
  icon?: string;

  @Field((type) => [Float, Float], { nullable: true })
  latLng?: [number, number];

  @Field((type) => Date)
  createdAt?: Date;

  @Field((type) => Date, { nullable: true })
  deletedAt?: Date;
}
