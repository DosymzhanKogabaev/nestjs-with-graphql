import { forwardRef, Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [forwardRef(() => ProductsModule)],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
