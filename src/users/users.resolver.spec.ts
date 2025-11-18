import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../products/products.service';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let usersService: UsersService;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver, UsersService, ProductsService],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    usersService = module.get<UsersService>(UsersService);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should return all users', () => {
    const mockusers = [{ id: 1, name: 'John Doe', products: [] }];
    jest.spyOn(usersService, 'findAll').mockReturnValue(mockusers);
    const users = resolver.users();
    expect(users).toEqual(mockusers);
  });

  it('should return a user by id', () => {
    const mockuser = { id: 1, name: 'John Doe', products: [] };
    jest.spyOn(usersService, 'findOne').mockReturnValue(mockuser);
    const user = resolver.user(1);
    expect(user).toEqual(mockuser);
  });

  it('should create a user', () => {
    const input = { name: 'John Doe' };
    const mockuser = { id: 1, name: 'John Doe', products: [] };
    jest.spyOn(usersService, 'create').mockReturnValue(mockuser);
    const user = resolver.createUser(input);
    expect(user).toEqual(mockuser);
  });

  it('should return products for a user', () => {
    const mockproducts = [{ id: 1, title: 'Product 1', userId: 1 }];
    jest.spyOn(productsService, 'findByUserId').mockReturnValue(mockproducts);
    const products = resolver.products({
      id: 1,
      name: 'John Doe',
      products: [],
    });
    expect(products).toEqual(mockproducts);
  });
});
