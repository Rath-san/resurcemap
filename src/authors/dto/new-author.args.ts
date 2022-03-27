import { Field, InputType } from '@nestjs/graphql';
// import { Type } from 'class-transformer';
// import { Length, MaxLength } from 'class-validator';

@InputType()
export class NewAuthorInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;
  //   @Field()
  //   @MaxLength(30)
  //   title: string;

  //   @Field({ nullable: true })
  //   @Length(30, 255)
  //   description?: string;

  //   @Type(() => String)
  //   @Field((type) => [String])
  //   ingredients: string[];
}
