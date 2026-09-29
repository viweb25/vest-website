# Database Schema Documentation

This document provides a full breakdown of the database tables created for the application based on the Prisma schema.

## Enums

| Enum Name | Values |
| :--- | :--- |
| **UserStatus** | `ACTIVE`, `INACTIVE`, `SUSPENDED` |
| **Role** | `USER`, `ADMIN`, `SUPER_ADMIN` |

---

## Tables

### 1. `users` (Model: User)
Core account details and authentication information.

| Column | Type | Attributes / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id`, UUID | Primary key |
| `email` | String | `@unique` | User's email address |
| `passwordHash` | String? | Nullable | Hashed password (null for OAuth) |
| `googleId` | String? | `@unique`, Nullable | Google OAuth ID |
| `githubId` | String? | `@unique`, Nullable | GitHub OAuth ID |
| `name` | String | | User's full name |
| `emailVerified` | Boolean | `@default(false)` | Email verification status |
| `status` | UserStatus | `@default(ACTIVE)` | Account status |
| `role` | Role | `@default(USER)` | User permission role |
| `createdAt` | DateTime | `@default(now())` | Creation timestamp |
| `updatedAt` | DateTime | `@updatedAt` | Last update timestamp |
| `lastLoginAt` | DateTime? | Nullable | Timestamp of last login |

### 2. `profiles` (Model: Profile)
Extended profile information linked to a user.

| Column | Type | Attributes / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id`, UUID | Primary key |
| `userId` | String | `@unique`, FK (`User`) | Foreign key to `users` |
| `avatarUrl` | String? | Nullable | URL to profile picture |
| `phone` | String? | Nullable | Contact phone number |
| `createdAt` | DateTime | `@default(now())` | Creation timestamp |
| `updatedAt` | DateTime | `@updatedAt` | Last update timestamp |

### 3. `refresh_tokens` (Model: RefreshToken)
Long-lived tokens for session refreshment.

| Column | Type | Attributes / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id`, UUID | Primary key |
| `userId` | String | FK (`User`) | Foreign key to `users` |
| `tokenHash` | String | `@unique` | Hashed token |
| `expiresAt` | DateTime | | Expiry timestamp |
| `revokedAt` | DateTime? | Nullable | Revocation timestamp |
| `ipAddress` | String? | Nullable | IP address during creation |
| `userAgent` | String? | Nullable | Device/Browser string |
| `createdAt` | DateTime | `@default(now())` | Creation timestamp |

### 4. `sessions` (Model: Session)
Active web sessions tracker.

| Column | Type | Attributes / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id`, UUID | Primary key |
| `userId` | String | FK (`User`) | Foreign key to `users` |
| `tokenHash` | String | `@unique` | Hashed session token |
| `expiresAt` | DateTime | | Expiry timestamp |
| `revokedAt` | DateTime? | Nullable | Revocation timestamp |
| `ipAddress` | String? | Nullable | IP address |
| `userAgent` | String? | Nullable | Device/Browser string |
| `createdAt` | DateTime | `@default(now())` | Creation timestamp |

### 5. `email_verification_tokens` (Model: EmailVerificationToken)
Tokens used to verify a user's email address upon registration.

| Column | Type | Attributes / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id`, UUID | Primary key |
| `userId` | String | FK (`User`) | Foreign key to `users` |
| `token` | String | `@unique` | The verification token |
| `expiresAt` | DateTime | | Expiry timestamp |
| `createdAt` | DateTime | `@default(now())` | Creation timestamp |

### 6. `password_reset_tokens` (Model: PasswordResetToken)
Tokens used during the "forgot password" flow.

| Column | Type | Attributes / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id`, UUID | Primary key |
| `userId` | String | FK (`User`) | Foreign key to `users` |
| `token` | String | `@unique` | The reset token |
| `expiresAt` | DateTime | | Expiry timestamp |
| `createdAt` | DateTime | `@default(now())` | Creation timestamp |

### 7. `login_attempts` (Model: LoginAttempt)
Security log of all login attempts (successful and failed).

| Column | Type | Attributes / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id`, UUID | Primary key |
| `userId` | String? | FK (`User`), Nullable | Foreign key to `users` (if matched) |
| `email` | String | | Email used for attempt |
| `ipAddress` | String | | IP address of attempt |
| `success` | Boolean | | Whether login succeeded |
| `createdAt` | DateTime | `@default(now())` | Attempt timestamp |

### 8. `audit_logs` (Model: AuditLog)
General audit trail for critical security actions (logout, reuse detected, etc).

| Column | Type | Attributes / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id`, UUID | Primary key |
| `userId` | String? | FK (`User`), Nullable | Foreign key to `users` |
| `action` | String | | Description of the action |
| `details` | String? | Nullable | Additional JSON/string details |
| `ipAddress` | String? | Nullable | IP address where action occurred |
| `createdAt` | DateTime | `@default(now())` | Action timestamp |
