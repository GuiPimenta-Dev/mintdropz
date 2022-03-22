# Exercise

Your Goal is to build a small application where a user can create a post on their own social media type platform.

[x] - Create an expressjs server

[x] - Connect mongodb atlas with this server

[x] - Create a user model with name email password image

[x] - Create an api get the data (name email password , image) and save it using mongodb

[x] - Step5- Password should be hashed using bycrypt js

[x] - Validate the email is not already exist and not invalid

[x] - Send the response with created user without password

[x] - Create Post model with image title and description

[x] - Create post functionality

[x] - Get all post functionality

[x] - Get post by id functionality

[x] - User can delete his own post

[x] - User can update his own post

[x] - Only signed in user can see all post

[x] - Implement Authorization flow make apis private

# Project Architecture

The API is written following SOLID principles to ensure maintainability as the project grows. These practices can also contribute to avoiding code smells, code refactoring, and agile or adaptive software development.

- S - Single-responsiblity Principle

All Controllers and Services have a single responsibility throughout the code.

<br>

- O - Open-closed Principle

All entities are just being extended and never modified.

<br>

- L - Liskov Substitution Principle

All derived classes can be replaced by parent class along the code.

<br>

- I - Interface Segregation Principle

The classes are never forced to implement an interface they don't use throughout the code.

<br>

- D - Dependency Inversion Principle

All entities depend on abstractions, not concretions.

<br>

The API is also following the Domain-driven-design (DDD) approach where each structure must match its business domain.

<br>

# Available Endpoints

Click the button below to download my Insomnia requests.

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=MintDropz&uri=https%3A%2F%2Fraw.githubusercontent.com%2FGuiPimenta-Dev%2Fmintdropz%2Fmaster%2Fexport.json%3Ftoken%3DGHSAT0AAAAAABPQTDCOHTIQKEHZ7ZQYDXDIYRZW4DQ)

## Manufacturer

<br>

### Create a manufacturer.

    The parameter name is mandatory.

    curl --request POST \
    --url http://ec2-54-207-192-146.sa-east-1.compute.amazonaws.com:3333/manufacturer \
    --header 'Content-Type: application/json' \
    --data '{
        "name": "First Manufacturer"
    }'

<br>

### List all manufacturers

    curl --request GET \
    --url http://ec2-54-207-192-146.sa-east-1.compute.amazonaws.com:3333/manufacturer \
    --header 'Content-Type: application/json'

<br>

### Update a manufacturer

    The parameter name is mandatory.

    curl --request PUT \
    --url http://ec2-54-207-192-146.sa-east-1.compute.amazonaws.com:3333/manufacturer/{:id} \
    --header 'Content-Type: application/json' \
    --data '{
        "name": "New Manufacture`s name"
    }'

<br>

### Delete a manufacturer

    curl --request DELETE \
    --url http://ec2-54-207-192-146.sa-east-1.compute.amazonaws.com:3333/manufacturer/{:id} \
    --header 'Content-Type: application/json'

<br>

### List a manufacturer`s equipments

    curl --request GET \
    --url http://ec2-54-207-192-146.sa-east-1.compute.amazonaws.com:3333/manufacturer/equipments/{:id} \
    --header 'Content-Type: application/json'

## Equipment

<br>

### Create an equipment

    For this request, the model and the manufacturerId are mandatory, but you can create an equipment that don`t belongs to any manufacturer.

    curl --request POST \
    --url http://ec2-54-207-192-146.sa-east-1.compute.amazonaws.com:3333/equipment \
    --header 'Content-Type: application/json' \
    --data '{
        "model":"First Equipment",
        "manufacturerId": {:manufacturerId} || null
    }'

<br>

### List all equipments

    curl --request GET \
    --url http://ec2-54-207-192-146.sa-east-1.compute.amazonaws.com:3333/equipment \
    --header 'Content-Type: application/json'

<br>

### Update an equipment

    You can create a relationship between an existing equipment and an existing manufacturer, or remove/update an existing one.

    Model and serialNumber are optionals and manufacturerId is mandatory.

    curl --request PUT \
    --url http://ec2-54-207-192-146.sa-east-1.compute.amazonaws.com:3333/equipment/{:id} \
    --header 'Content-Type: application/json' \
    --data '{
        "model": "New Model",
        "serialNumber": "New Serial Number",
        "manufacturerId": {:manufacturerId} || null
    }'

<br>

### Delete an equipment

    curl --request DELETE \
    --url http://ec2-54-207-192-146.sa-east-1.compute.amazonaws.com:3333/equipment/{:id} \
    --header 'Content-Type: application/json'

<br>

### List an equipment owner

    curl --request GET \
    --url http://ec2-54-207-192-146.sa-east-1.compute.amazonaws.com:3333/equipment/manufacturer/{:id} \
    --header 'Content-Type: application/json'

<br>

# Tests

## All endpoints mentioned above were tested with the jest library to ensure they are working properly.

<p align="center">
  <img src="storage/2022-03-14-13-26-54.png" alt="drawing" height="500"/>
</p>

Project coverage is at 100% as seen in the image below.

<img src="storage/2022-03-14-13-33-42.png" alt="drawing" />

<br>

# BitBucket Pipelines

There is a video in the project root showing the CI/CD process working correctly.

    storage/pipeline-ci:cd.mov

<br>

I intentionally set the pipeline to trigger on the development branch only. Please make sure you are on the correct branch when testing the deployment process.

# Thanks for reading!

<br>

_Clean code always looks like it was written by someone who cares._

_Michael Feathers_
