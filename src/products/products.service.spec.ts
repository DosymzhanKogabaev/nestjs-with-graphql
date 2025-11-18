import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, UsersService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all products', () => {
    const products = service.findAll();
    expect(products).toBeDefined();
    expect(products).toBeInstanceOf(Array);
  });

  it('should find products by user id', () => {
    const user = usersService.create({ name: 'John Doe' });
    const product = service.create({ title: 'Laptop', userId: user.id });
    const products = service.findByUserId(user.id);
    expect(products).toContain(product);
    expect(products.length).toBeGreaterThan(0);
  });

  it('should create a product with valid user', () => {
    const user = usersService.create({ name: 'Alice' });
    const product = service.create({ title: 'Phone', userId: user.id });
    expect(product).toBeDefined();
    expect(product).toHaveProperty('id');
    expect(product.title).toBe('Phone');
    expect(product.userId).toBe(user.id);
  });

  it('should throw NotFoundException when creating product with invalid user', () => {
    expect(() => {
      service.create({ title: 'Tablet', userId: 999 });
    }).toThrow(NotFoundException);
  });

  it('should return empty array for user with no products', () => {
    const products = service.findByUserId(999);
    expect(products).toEqual([]);
  });
});
