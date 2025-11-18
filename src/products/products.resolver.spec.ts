import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

describe('ProductsResolver', () => {
  let resolver: ProductsResolver;
  let productsService: ProductsService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsResolver, ProductsService, UsersService],
    }).compile();

    resolver = module.get<ProductsResolver>(ProductsResolver);
    productsService = module.get<ProductsService>(ProductsService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should return all products', () => {
    const mockProducts = [
      { id: 1, title: 'Laptop', userId: 1 },
      { id: 2, title: 'Phone', userId: 1 },
    ];
    jest.spyOn(productsService, 'findAll').mockReturnValue(mockProducts);
    const products = resolver.products();
    expect(products).toBe(mockProducts);
  });

  it('should create a product', () => {
    const input = { title: 'Tablet', userId: 1 };
    const mockProduct = { id: 1, ...input };

    jest.spyOn(productsService, 'create').mockReturnValue(mockProduct);
    const addSpy = jest.spyOn(usersService, 'addProductToUser');

    const product = resolver.createProduct(input);
    expect(product).toBe(mockProduct);
    expect(addSpy).toHaveBeenCalledWith(input.userId, mockProduct);
  });
});
