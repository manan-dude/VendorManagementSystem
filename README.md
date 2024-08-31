# Additionally:  Created a Docker image and also hosted on the [Link](https://vendormanagementsystem.onrender.com).

*Note:* You can use your own MongoDB URI for running in the system else use the link and test. 

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash

$ npm run start:dev

```

## For Docker:
```
docker build -t your-nestjs-app .
docker run -e MONGODB_URI="mongodb://your_mongodb_username:your_mongodb_password@your_mongodb_host:your_mongodb_port/your_database_name" -p 3000:3000 your-nestjs-app
```

# API informations

## Vendor API Documentation

### Base URL: `/vendors`

#### GET `/vendors`
* **Description:** Retrieves a list of all vendors.
* **Response:** An array of Vendor objects.

#### POST `/vendors`
* **Description:** Creates a new vendor.
* **Request Body:** A Vendor object containing the following properties:
  - `name` (string)
  - `contactDetails` (string)
  - `address` (string)
  - `vendorCode` (string, unique)
  - `onTimeDeliveryRate` (number, 0-100)
  - `qualityRatingAvg` (number, 0-5)
  - `averageResponseTime` (number, 0)
  - `fulfillmentRate` (number, 0-100)
* **Response:** A success message indicating the vendor was added.

#### GET `/vendors/:vendorCode`
* **Description:** Retrieves a specific vendor by its vendor code.
* **Path Parameters:**
  - `vendorCode` (string): The vendor code.
* **Response:** A Vendor object or an error if the vendor is not found.

#### PUT `/vendors/:vendorCode`
* **Description:** Updates a specific vendor by its vendor code.
* **Path Parameters:**
  - `vendorCode` (string): The vendor code.
* **Request Body:** A partial Vendor object containing the updated properties.
* **Response:** A success message indicating the vendor was updated.

#### DELETE `/vendors/:vendorCode`
* **Description:** Deletes a specific vendor by its vendor code.
* **Path Parameters:**
  - `vendorCode` (string): The vendor code.
* **Response:** A success message indicating the vendor was deleted, or an error if the vendor is not found.

## Purchase Order API Documentation

**Base URL:** `/purchase-orders`

### GET `/purchase-orders`
* **Description:** Retrieves a list of all purchase orders.
* **Query Parameters:**
  - `vendorCode` (optional): Filter purchase orders by vendor code.
* **Response:** An array of PurchaseOrder objects.

### POST `/purchase-orders`
* **Description:** Creates a new purchase order.
* **Request Body:** A PurchaseOrder object containing the following properties:
  - `poNumber` (string, unique)
  - `vendor` (ObjectId, reference to Vendor)
  - `orderDate` (Date)
  - `deliveryDate` (Date)
  - `items` (array of PurchaseOrderItem objects)
  - `quantity` (number)
  - `status` (string, enum: 'pending', 'completed', 'canceled')
  - `qualityRating` (number, 0-5)
  - `issueDate` (Date)
  - `acknowledgmentDate` (Date)
* **Response:** A success message indicating the purchase order was added.

### GET `/purchase-orders/:poId`
* **Description:** Retrieves a specific purchase order by its ID.
* **Path Parameters:**
  - `poId` (string): The ID of the purchase order.
* **Response:** A PurchaseOrder object or `null` if not found.

### PUT `/purchase-orders/:poId`
* **Description:** Updates a specific purchase order by its ID.
* **Path Parameters:**
  - `poId` (string): The ID of the purchase order.
* **Request Body:** A partial PurchaseOrder object containing the updated properties.
* **Response:** The updated PurchaseOrder object.

### DELETE `/purchase-orders/:poId`
* **Description:** Deletes a specific purchase order by its ID.
* **Path Parameters:**
  - `poId` (string): The ID of the purchase order.
* **Response:** A success message indicating the purchase order was deleted.

**Authentication:**
* The API endpoints are protected by JWT authentication. You'll need to provide a valid JWT token in the `Authorization` header.
* The token format should be `Bearer <token>`.

## Vendor Performance API Documentation

**Base URL:** `/vendors`

### GET `/vendors/:vendorId/performance`
* **Description:** Retrieves the performance metrics for a specific vendor.
* **Path Parameters:**
  - `vendorId` (string): The ID of the vendor.
* **Response:** An object containing the following properties:
  - `onTimeDeliveryRate` (number)
  - `qualityRatingAvg` (number)
  - `averageResponseTime` (number)
  - `fulfillmentRate` (number)

**Note:** The API adheres to RESTful principles and uses standard HTTP methods for CRUD operations. The response formats and error handling can be further customized based on your specific requirements.




