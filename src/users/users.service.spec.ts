import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should create a user', () => {
    const user = service.create({ name: 'John Doe' });
    expect(user).toBeDefined();
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');
    expect(user.products).toEqual([]);
  });

  it('should find all users', () => {
    const users = service.findAll();
    expect(users).toBeDefined();
    expect(users).toBeInstanceOf(Array);
  });

  it('should find a user by id', () => {
    const user = service.create({ name: 'Bob' });
    const found = service.findOne(user.id);
    expect(found).toEqual(user);
  });

  it('should add a product to a user', () => {
    const user = service.create({ name: 'Alice' });
    const product = { id: 1, title: 'product', userId: user.id };
    service.addProductToUser(user.id, product);
    expect(service.findOne(user.id)?.products).toContain(product);
  });
});
