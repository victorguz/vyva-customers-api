# Vyva Customers API

Serverless module for customer management in the Vyva platform.

## Overview

This module handles all customer-related operations including CRUD operations, customer counts, and customer data management.

## Features

- Customer CRUD operations
- Customer count by business
- Customer search and filtering
- Business-specific customer isolation

## Prerequisites

- Node.js 20.x
- AWS CLI configured
- Serverless Framework
- Access to AWS SSM Parameter Store

## Installation

```bash
npm install
```

## Local Development

```bash
npm run start
```

## Deployment

Deploy to QAS:
```bash
npm run deploy:qas:force
```

Deploy to PRD:
```bash
npm run deploy:prd:force
```

## Environment Variables

All environment variables are managed through AWS Systems Manager Parameter Store with the prefix `/vyva/{stage}/VYVA_*`.

Required parameters:
- `VYVA_ACCESS_KEY_ID`
- `VYVA_SECRET_ACCESS_KEY`
- `VYVA_REGION`
- `VYVA_JWT_SECRET`
- `VYVA_SECRET_KEY`

## API Endpoints

Base path: `/api/customers`

All endpoints require JWT authentication.

## Structure

```
src/
├── app/
│   ├── core/              # Core configuration
│   ├── modules/
│   │   ├── customers/     # Customers module
│   │   └── shared/        # Shared modules (Auth)
│   ├── schemas/           # DynamoDB schemas
│   └── shared/            # Shared utilities
├── lambda.ts              # AWS Lambda handler
└── main.ts                # Application bootstrap
```



