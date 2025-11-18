import { forwardRef, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from '../dtos/create-product.input';
import { UsersService } from '../users/users.service';
import { Product } from './product.type';
import { ProductsService } from './products.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private productsService: ProductsService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  @Query(() => [Product])
  products() {
    return this.productsService.findAll();
  }

  @Mutation(() => Product)
  createProduct(@Args('input') input: CreateProductInput) {
    const product = this.productsService.create(input);

    this.usersService.addProductToUser(input.userId, product);

    return product;
  }
}
