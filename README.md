# NestJS GraphQL API

A modern GraphQL API built with NestJS, Apollo Server, and TypeScript. This project demonstrates a complete GraphQL implementation with user and product management, including relations between entities.

## 🚀 Features

- **GraphQL API** with Apollo Server integration
- **Type-safe** development with TypeScript
- **Schema-first approach** with auto-generated schema
- **Entity relationships** between Users and Products
- **Input validation** using class-validator
- **Error handling** with proper GraphQL error responses
- **GraphQL Playground** for interactive API testing

## 🛠️ Tech Stack

- **NestJS** - Progressive Node.js framework
- **GraphQL** - Query language for APIs
- **Apollo Server** - GraphQL server implementation
- **TypeScript** - Static typing for JavaScript
- **Class Validator** - Decorator-based validation
- **Express 5** - Web framework

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/DosymzhanKogabaev/nestjs-with-graphql

# Navigate to project directory
cd nestjs-with-graphql

# Install dependencies
npm install
```

## 🏃 Running the Application

```bash
# Development mode (with hot reload)
npm run start:dev

# Production mode
npm run start:prod

# Build the project
npm run build
```

The application will start on **http://localhost:5000**

## 🎮 GraphQL Playground

Access the interactive GraphQL Playground at:

**http://localhost:5000/graphql**

## 📚 API Documentation

### Schema Overview

#### Types

**User**

- `id: Int!` - Unique identifier
- `name: String!` - User's name
- `products: [Product!]!` - List of products owned by the user

**Product**

- `id: Int!` - Unique identifier
- `title: String!` - Product title
- `userId: Int!` - ID of the user who owns this product

### Queries

#### Get All Users

```graphql
query GetAllUsers {
  users {
    id
    name
    products {
      id
      title
    }
  }
}
```

#### Get User by ID

```graphql
query GetUser {
  user(id: 1) {
    id
    name
    products {
      id
      title
    }
  }
}
```

**Note:** Returns a `NOT_FOUND` error if user doesn't exist.

#### Get All Products

```graphql
query GetAllProducts {
  products {
    id
    title
    userId
  }
}
```

### Mutations

#### Create User

```graphql
mutation CreateUser {
  createUser(input: { name: "John Doe" }) {
    id
    name
  }
}
```

**Input:**

- `name: String!` - User's name (required)

#### Create Product

```graphql
mutation CreateProduct {
  createProduct(input: { title: "Laptop", userId: 1 }) {
    id
    title
    userId
  }
}
```

**Input:**

- `title: String!` - Product title (required)
- `userId: Int!` - ID of the user who owns this product (required)

**Note:** Returns a `NOT_FOUND` error if the specified user doesn't exist.

## 🧪 Testing Examples

### Complete Test Flow

```graphql
# 1. Create users
mutation {
  user1: createUser(input: { name: "Alice" }) {
    id
    name
  }
  user2: createUser(input: { name: "Bob" }) {
    id
    name
  }
}

# 2. Create products
mutation {
  product1: createProduct(input: { title: "Laptop", userId: 1 }) {
    id
    title
  }
  product2: createProduct(input: { title: "Phone", userId: 1 }) {
    id
    title
  }
  product3: createProduct(input: { title: "Tablet", userId: 2 }) {
    id
    title
  }
}

# 3. Query all users with their products
query {
  users {
    id
    name
    products {
      id
      title
    }
  }
}

# Expected Result:
# {
#   "data": {
#     "users": [
#       {
#         "id": 1,
#         "name": "Dosymzhan",
#         "products": [
#           { "id": 1, "title": "iPhone" },
#           { "id": 2, "title": "Laptop" },
#           { "id": 3, "title": "Phone" }
#         ]
#       },
#       {
#         "id": 2,
#         "name": "Alice",
#         "products": []
#       },
#       {
#         "id": 3,
#         "name": "Bob",
#         "products": [
#           { "id": 4, "title": "Tablet" }
#         ]
#       }
#     ]
#   }
# }
```

## 📁 Project Structure

```
nestjs-with-graphql/
├── src/
│   ├── dtos/                      # Data Transfer Objects
│   │   ├── create-user.input.ts   # User creation input
│   │   └── create-product.input.ts # Product creation input
│   ├── products/                  # Products module
│   │   ├── product.type.ts        # Product GraphQL type
│   │   ├── products.module.ts     # Products module definition
│   │   ├── products.resolver.ts   # Products GraphQL resolver
│   │   └── products.service.ts    # Products business logic
│   ├── users/                     # Users module
│   │   ├── user.type.ts           # User GraphQL type
│   │   ├── users.module.ts        # Users module definition
│   │   ├── users.resolver.ts      # Users GraphQL resolver
│   │   └── users.service.ts       # Users business logic
│   ├── app.module.ts              # Root application module
│   ├── app.controller.ts          # Application controller
│   ├── app.service.ts             # Application service
│   ├── main.ts                    # Application entry point
│   └── schema.gql                 # Auto-generated GraphQL schema
├── test/                          # E2E tests
├── dist/                          # Compiled output
├── node_modules/                  # Dependencies
├── package.json                   # Project dependencies
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

## 🔧 Configuration

### Port Configuration

The application runs on port **5000** by default. You can change this by setting the `PORT` environment variable:

```bash
PORT=3000 npm run start:dev
```

### GraphQL Configuration

GraphQL settings can be modified in `src/app.module.ts`:

```typescript
GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  playground: true, // Enable/disable GraphQL Playground
  sortSchema: true,
});
```

## 🔍 Validation

The application uses `class-validator` for input validation:

- All inputs are validated automatically
- Non-whitelisted properties are rejected
- Transforms are applied where needed

## ⚠️ Error Handling

The API provides proper error responses:

- **NOT_FOUND**: When a requested resource doesn't exist
- **BAD_REQUEST**: When input validation fails
- **INTERNAL_SERVER_ERROR**: For unexpected errors

Example error response:

```json
{
  "errors": [
    {
      "message": "User with ID 999 not found",
      "extensions": {
        "code": "NOT_FOUND"
      }
    }
  ],
  "data": null
}
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🎨 Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## 📝 Scripts

| Script                | Description                          |
| --------------------- | ------------------------------------ |
| `npm run start`       | Start the application                |
| `npm run start:dev`   | Start in development mode with watch |
| `npm run start:debug` | Start in debug mode                  |
| `npm run start:prod`  | Start in production mode             |
| `npm run build`       | Build the project                    |
| `npm run format`      | Format code with Prettier            |
| `npm run lint`        | Lint code with ESLint                |
| `npm run test`        | Run unit tests                       |
| `npm run test:watch`  | Run tests in watch mode              |
| `npm run test:cov`    | Run tests with coverage              |
| `npm run test:e2e`    | Run end-to-end tests                 |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👤 Author

Dosymzhan Kogabaev

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - The progressive Node.js framework
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - GraphQL server
- [GraphQL](https://graphql.org/) - Query language for APIs

---

Made with ❤️ using NestJS and GraphQL
