*Note:*  Created a Docker image and hosted on the [Link](https://vendormanagementsystem.onrender.com).

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

**Note:** The API adheres to RESTful principles and uses standard HTTP methods for CRUD operations. The response formats and error handling can be further customized based on your specific requirements.

