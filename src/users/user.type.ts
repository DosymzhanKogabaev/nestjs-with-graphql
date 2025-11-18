import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/products/product.type';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  // Relation
  @Field(() => [Product])
  products: Product[];
}
