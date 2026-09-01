# CodePix API

REST API for a simulated banking system with Pix key management and inter-bank transfers. Built with [NestJS](https://nestjs.com), TypeScript, PostgreSQL, Kafka, and gRPC.

## Overview

The project simulates two banks (`bank-001` and `bank-002`) that communicate via Kafka to process Pix transactions. Integration with the Pix key service is handled via gRPC.

## Tech Stack

- **NestJS 11** — main framework
- **TypeORM + PostgreSQL** — persistence
- **Kafka** — inter-bank messaging (via `@nestjs/microservices`)
- **gRPC** — communication with the Pix key service
- **Docker / Docker Compose** — development environment

## Prerequisites

- Docker and Docker Compose installed
- Kafka and the CodePix gRPC service running externally (at `host.docker.internal`)

## Configuration

Each bank uses a separate `.env` file. The `.bank-001.env` and `.bank-002.env` files are already in the repository with bank-specific variables.

Base environment variables (`.env`):

```env
TYPEORM_CONNECTION=postgres
TYPEORM_HOST=db
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=root
TYPEORM_PORT=5432

GRPC_URL=host.docker.internal:50051
KAFKA_BROKER=host.docker.internal:9094
```

Per-bank variables (`.bank-00x.env`):

```env
BANK_CODE=001
TYPEORM_DATABASE=nest_bank_001
PORT=3000
KAFKA_CONSUMER_GROUP_ID=nest_bank_001
```

## Installation

```bash
npm install
```

## Getting Started

**1. Start the database and application:**

```bash
docker compose up -d
```

**2. Enter the app container:**

```bash
docker compose exec app bash
```

**3. Seed the database with fixture data:**

```bash
BANK_CODE=001 npm run console fixtures
```

**4. Start the application in development mode:**

```bash
BANK_CODE=001 npm run start:dev
```

## Running locally

```bash
# development
npm run start

# watch mode
npm run start:dev

# production
npm run start:prod
```

## Endpoints

The API exposes the following REST routes (default port: `3000`):

### Bank Accounts

| Method  | Route                 | Description            |
| ------- | --------------------- | ---------------------- |
| `GET`   | `/bank-accounts`      | List all accounts      |
| `GET`   | `/bank-accounts/:id`  | Get account by ID      |
| `POST`  | `/bank-accounts`      | Create a new account   |

```json
// POST /bank-accounts
{
  "account_number": "1111-1",
  "owner_name": "John Doe"
}
```

### Pix Keys

| Method   | Route                                        | Description        |
| -------- | -------------------------------------------- | ------------------ |
| `GET`    | `/bank-accounts/:bankAccountId/pix-keys`     | List account keys  |
| `POST`   | `/bank-accounts/:bankAccountId/pix-keys`     | Register a new key |
| `DELETE` | `/bank-accounts/:bankAccountId/pix-keys/:id` | Deactivate a key   |

Supported key types: `cpf`, `email`

```json
// POST /bank-accounts/:bankAccountId/pix-keys
{
  "kind": "email",
  "key": "user@email.com"
}
```

### Transactions

| Method  | Route                                            | Description               |
| ------- | ------------------------------------------------ | ------------------------- |
| `GET`   | `/bank-accounts/:bankAccountId/transactions`     | List account transactions |
| `POST`  | `/bank-accounts/:bankAccountId/transactions`     | Create a new transaction  |

```json
// POST /bank-accounts/:bankAccountId/transactions
{
  "pix_key_key": "user@email.com",
  "pix_key_kind": "email",
  "description": "Payment",
  "amount": 10.00
}
```

## Messaging (Kafka)

The service consumes messages from the `bank001` and `bank002` topics. Each instance only processes messages for its own bank (checked via `BANK_CODE`).

Two message types are supported:

- `status: "pending"` — creates a transaction received from another bank
- `status: "confirmed"` — confirms an existing transaction

## Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# coverage
npm run test:cov
```

## HTTP Files

The `.http` files in the project root can be used with the VS Code REST Client extension:

- `api.http` — general API examples
- `bank-001.http` — requests for bank 001
- `bank-002.http` — requests for bank 002
