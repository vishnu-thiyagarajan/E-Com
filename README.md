user login : 
    method : POST
    path : /users
    body : {
            "username": "firstuser",
            "password": "firstuser"
            }
    Add the recieved token to other request which is specific to users  

list all products :
    method : GET
    path : /products

list all categories:
    method : GET
    path : /categorys

list all products of a specific category:
    method : GET
    path : /products/5f230e8602dd2e3e75852302

get cart for a specific user:
    method : GET
    Attach athourization token in header
    path : /carts
    
add product to cart:
    method : POST
    Attach athourization token in header
    path : /carts/add
    body : {
            "product": {
                    "_id": "5f2311a9e43d104183dc2f86",
                    "category": {
                        "_id": "5f230e8602dd2e3e75852302",
                        "name": "T-Shirt",
                        "type": "clothing",
                        "createdAt": "2020-07-30T18:16:38.368Z",
                        "updatedAt": "2020-07-30T18:16:38.368Z",
                        "__v": 0
                    },
                    "name": "Red T-shirt",
                    "description": "High quality",
                    "price": 400.5,
                    "make": 2020,
                    "createdAt": "2020-07-30T18:30:01.351Z",
                    "updatedAt": "2020-07-30T18:30:01.351Z",
                    "__v": 0
                },
            "quantity": 2
            }