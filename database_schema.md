# Auth Service

| Field      | Type             |
|------------|------------------|
| id         | int4             |
| email      | varchar          |
| password   | varchar (bcrypt) |
| created_at | timestamp        |
| updated_at | timestamp        |

# Order Service

| Field       | Type          |
|-------------|---------------|
| id          | int4          |
| price       | numeric(12,2) |
| productId   | int4          |
| userId      | int4          |
| isCanceled  | bool          |
| canceled_at | timestamp     |
| created_at  | timestamp     |
| updated_at  | timestamp     |

# Product Service

| Field       | Type          |
|-------------|---------------|
| id          | int4          |
| name        | varchar       |
| sku         | varchar       |
| stock       | int4          |
| price       | numeric(12,2) |
| created_at  | timestamp     |
| updated_at  | timestamp     |

# User Service

| Field        | Type          |
|--------------|---------------|
| id           | int4          |
| email        | varchar       |
| profileImage | varchar       |
| address      | varchar       |
| created_at   | timestamp     |
| updated_at   | timestamp     |