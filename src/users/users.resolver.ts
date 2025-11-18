import { forwardRef, Inject } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateUserInput } from '../dtos/create-user.input';
import { ProductsService } from '../products/products.service';
import { User } from './user.type';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService,
  ) {}

  @Query(() => [User])
  users() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput) {
    return this.usersService.create(input);
  }

  // Relation: user -> products
  @ResolveField()
  products(@Parent() user: User) {
    return this.productsService.findByUserId(user.id);
  }
}
