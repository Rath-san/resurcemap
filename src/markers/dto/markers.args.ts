import { ArgsType, Field, Float } from '@nestjs/graphql';
// import { Max, Min } from 'class-validator';

@ArgsType()
export class MarkersArgs {
  @Field((type) => String, { nullable: true })
  firstName: string;

  @Field((type) => String, { nullable: true })
  lastName: string;

  // user added name its a custom string
  @Field((type) => String, { nullable: true })
  name?: string;

  // node type ex `mining`, `logging`
  @Field((type) => String, { nullable: true })
  nodeType?: string;

  @Field((type) => String, { nullable: true })
  icon?: string;

  @Field((type) => [Float, Float], { nullable: true })
  latLng?: [number, number];

  //   @Min(0)
  //   skip = 0;

  //   @Field(type => Int)
  //   @Min(1)
  //   @Max(50)
}
