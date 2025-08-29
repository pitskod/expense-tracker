# Expense Tracking API

A RESTful API for tracking expenses built with TypeScript, Express, and Prisma.

## Project Structure

```
├── prisma/
│   └── schema.prisma       # Database schema definition
├── src/
│   ├── app.ts             # Express application setup
│   ├── index.ts           # Application entry point
│   ├── config/            # Configuration files
│   ├── db/                # Database connection setup
│   ├── expenses/          # Expense module (controllers, services, etc.)
│   └── helpers/           # Utility functions and middleware
└── tests/                 # Test files
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A database supported by Prisma (e.g., PostgreSQL)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables:
   - Create a `.env` file in the root directory
   - Add your database connection string and other required variables

4. Initialize the database:

```bash
npx prisma generate
npx prisma migrate dev
```

## Development

To start the development server:

```bash
npm run dev
```

## Testing

Run tests using Jest:

```bash
npm test
```

## API Endpoints

The API provides endpoints for managing expenses:

- `GET /expenses` - Get all expenses
- `GET /expenses/:id` - Get a specific expense
- `POST /expenses` - Create a new expense
- `PUT /expenses/:id` - Update an expense
- `DELETE /expenses/:id` - Delete an expense

## Error Handling

The application includes centralized error handling middleware and custom exception handling.

## Logging

Built-in logging functionality is provided through the custom Logger class.

## License

MIT
