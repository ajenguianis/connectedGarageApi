# 🧱 Smart Garage – Database Architecture

![Database Diagram](./docs/database-diagram.png)

## Overview

This document provides a structured explanation of the database architecture used in the Smart Garage application. The design relies on foreign key constraints to enforce referential integrity and define clear relationships between entities.

---

## 📘 Entity Relationships

### 1. `customers`
**Purpose**: Stores customer information (e.g., name, phone, email).  
**Relations**:
- **1:N → `vehicles`** – A customer can own multiple vehicles.
- **1:N → `signatures`** – A customer can have multiple digital signatures.
- **1:N → `notifications`** – A customer receives many notifications.
- **1:N → `appointments`** – A customer can schedule multiple appointments.

---

### 2. `vehicle_models`
**Purpose**: Defines vehicle models, including brand and fuel type.  
**Relations**:
- **1:N → `vehicles`** – A model can be linked to multiple vehicles.

---

### 3. `vehicles`
**Purpose**: Represents individual vehicles (license plate, VIN, etc.).  
**Relations**:
- **N:1 ← `customers`**
- **N:1 ← `vehicle_models`**
- **1:N → `services`**
- **1:N → `obd2_data`**
- **1:N → `appointments`**

---

### 4. `garages`
**Purpose**: Stores garage metadata (location, capacity).  
**Relations**:
- **1:N → `services`**
- **1:N → `subscriptions`**
- **1:N → `parts`**
- **1:N → `employees`**
- **1:N → `appointments`**

---

### 5. `services`
**Purpose**: Tracks repair or maintenance services.  
**Relations**:
- **N:1 ← `vehicles`**
- **N:1 ← `garages`**
- **N:1 ← `employees`** (technician)
- **1:N → `invoices`**
- **1:N → `service_photos`**
- **1:N → `service_parts`**

---

### 6. `invoices`
**Purpose**: Represents billing details for services.  
**Relations**:
- **N:1 ← `services`**

---

### 7. `obd2_data`
**Purpose**: Stores real-time vehicle diagnostics.  
**Relations**:
- **N:1 ← `vehicles`**

---

### 8. `signatures`
**Purpose**: Stores electronic signatures for confirmations.  
**Relations**:
- **N:1 ← `customers`**

---

### 9. `service_photos`
**Purpose**: Documents service progress via images.  
**Relations**:
- **N:1 ← `services`**
- **N:1 ← `employees`** (photo author)

---

### 10. `notifications`
**Purpose**: Sends service updates and reminders.  
**Relations**:
- **N:1 ← `customers`**

---

### 11. `subscriptions`
**Purpose**: Tracks garage subscription plans.  
**Relations**:
- **N:1 ← `garages`**

---

### 12. `parts`
**Purpose**: Manages spare part inventory.  
**Relations**:
- **N:1 ← `garages`**
- **1:N → `service_parts`**

---

### 13. `service_parts`
**Purpose**: Maps parts used in each service.  
**Relations**:
- **N:1 ← `services`**
- **N:1 ← `parts`**

---

### 14. `appointments`
**Purpose**: Handles customer booking and scheduling.  
**Relations**:
- **N:1 ← `customers`**
- **N:1 ← `vehicles`**
- **N:1 ← `garages`**

---

### 15. `employees`
**Purpose**: Stores employee credentials and profiles.  
**Relations**:
- **N:1 ← `garages`**
- **1:N → `services`**
- **1:N → `service_photos`**
- **1:N → `employee_roles`**

---

### 16. `roles`
**Purpose**: Defines system roles (e.g., Admin, Mechanic).  
**Relations**:
- **1:N → `employee_roles`**
- **1:N → `role_permissions`**

---

### 17. `permissions`
**Purpose**: Describes available app permissions (e.g., create_invoice).  
**Relations**:
- **1:N → `role_permissions`**

---

### 18. `employee_roles`
**Purpose**: Maps employees to their roles.  
**Relations**:
- **N:1 ← `employees`**
- **N:1 ← `roles`**

---

### 19. `role_permissions`
**Purpose**: Links roles to their permissions.  
**Relations**:
- **N:1 ← `roles`**
- **N:1 ← `permissions`**

---

## 🧩 Notes

- All foreign key constraints ensure data integrity and consistent state across operations.
- Consider indexing foreign keys and commonly queried fields for performance.

---