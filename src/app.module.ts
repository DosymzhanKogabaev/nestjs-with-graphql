import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

const imports = [
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    playground: true, // GraphQL Playground
    sortSchema: true,
    formatError: (error: GraphQLError): GraphQLFormattedError => {
      const originalError = error.extensions?.originalError as
        | { statusCode?: number }
        | undefined;

      if (!originalError?.statusCode) {
        return error;
      }

      // Map HTTP status codes to GraphQL error codes
      const { statusCode } = originalError;
      let code = 'INTERNAL_SERVER_ERROR';

      if (statusCode === 404) {
        code = 'NOT_FOUND';
      } else if (statusCode === 400) {
        code = 'BAD_REQUEST';
      } else if (statusCode === 401) {
        code = 'UNAUTHENTICATED';
      } else if (statusCode === 403) {
        code = 'FORBIDDEN';
      }

      return {
        message: error.message,
        extensions: {
          code,
          statusCode,
        },
        locations: error.locations,
        path: error.path,
      };
    },
  }),
  UsersModule,
  ProductsModule,
];

@Module({
  imports,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
