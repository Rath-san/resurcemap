import { Field, InputType, Int, Float } from '@nestjs/graphql';
// import { Type } from 'class-transformer';
// import { Length, MaxLength } from 'class-validator';

@InputType()
export class UpdateMarkerInput {
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
}
