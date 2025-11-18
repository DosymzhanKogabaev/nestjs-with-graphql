import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from 'src/dtos/create-user.input';
import { Product } from 'src/products/product.type';
import { User } from './user.type';

@Injectable()
export class UsersService {
  private users: User[] = [{ id: 1, name: 'John Doe', products: [] }];
  private nextId = 2;

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  create(input: CreateUserInput) {
    const user = new User();
    user.id = this.nextId++;
    user.name = input.name;
    user.products = [];
    this.users.push(user);
    return user;
  }

  addProductToUser(userId: number, product: Product) {
    const user = this.findOne(userId);
    user.products.push(product);
    return user;
  }
}
