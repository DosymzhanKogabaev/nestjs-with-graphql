import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductInput } from 'src/dtos/create-product.input';
import { UsersService } from 'src/users/users.service';
import { Product } from './product.type';

@Injectable()
export class ProductsService {
  private products: Product[] = [{ id: 1, title: 'iPhone', userId: 1 }];
  private nextId = 2;
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  findAll() {
    return this.products;
  }

  findByUserId(userId: number) {
    return this.products.filter((p) => p.userId === userId);
  }

  create(input: CreateProductInput) {
    // check if user exists
    const user = this.usersService.findOne(input.userId);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${input.userId} does not exist`,
      );
    }

    const product = new Product();
    product.id = this.nextId++;
    product.title = input.title;
    product.userId = input.userId;

    this.products.push(product);
    return product;
  }
}
