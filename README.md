# vue_mall2
a mall written by vue

old repository address: 
- v1.0: [newMall](https://github.com/leiger/newMall) 
- v2.0 [vmall](https://github.com/leiger/vmall)

---

### FRONT_END
#### Install
```
cd client
npm install
npm start
```
#### Components
##### EntryBoard
- functions 
  - jump to the my github
  - toggle between signin+signup/nickName+signOut btn
    - sign in btn
      - click open form modal
    - sign up
      - action: true
      - type: 0->sign in; 1-> sign up
    - logout
      - confirm logout
- requests
  - /user/checkLogin
  - /user/logout

##### LoginModal
- login form
- login check
  - exist?
  - info
- third part login(icon)
- username and password
- after login
  - send ajax request: get nickName, cartList, close modal

##### NavHeader
- logo
- navbar
- cart 
  - login depend on the nickName === '' or not 
  - login ? show nums: hide
- contain LoginModal&Drawer components: reduce reuse in other pages

##### Drawer
- functions
  - change quantity
    - two parameters: id, quantity
      - quantity need > 0
    - post to server. If num===0, delete it. get cart list from vuex -> change total money
    - fail: 
      - error: alert(reflesh page)
      - not login: session expired
  - delete checked in database
- request
  - /cart/cartEdit
  - /cart/delCart
  - /cart/getCartList - getCartList.js

##### Article
- props: postTitle

#### Router
- `/`: index page
- `/profile/username`: user profile
- `/categories/:collectionName`: category and all products in it
- `products/:productId`: return specific product
- `/about`
- `/checkout`
- `/payment/:orderId`
- `/orderSuccess/:orderId`

---

### BACK_END
using express and mongondb

#### Install
```
cd server
npm install
node /bin/www
```
#### database
- users
  - _id
  - email
  - password
  - orderList: Array
    - _id
    - total: order total money
    - address: shipping address(full address)
    - products
    - status
      - 0: unpaid
      - 1: paid
      - 2: shipping
      - 3: finish
      - -1: cancel
    - date: create date
  - cartList: Array
    - _id
    - name
    - newPrice
    - images
    - numInCart
  - addressList: Array
    - _id
    - firstname
    - lastname
    - address
    - city
    - province
    - postalCode

- products
  - _id
  - category: {
    _id,
    name,
    products
  }
  - name: length(2-50)
  - oldPrice: optional, >0
  - newPrice: >0
  - promote: recomend
  - images: up to 3
  - numInStock
  - desc: optional

- categories
  - _id
  - name
  - products

---

### Plan
- products details
- modify database
- filter by category
- delay load
- large image
- logo design
- error log category

---

### bugs
  - objectId num wrong 500 error
  - 

---

### New Design
#### REST API
- `POST /api/auth`: login and save sessions
  - BODY: `{username: '', password: ''}`
- `DELETE /api/auth`: destroys session and redirect to / 

- `GET /api/users`: get all users
- `POST /api/users`: add a new user
- `GET /api/users/:id`: get a user info
  - `PUT /api/users/:id`: update a user's password
- `DELETE /api/users/:id`: delete a user

- `GET /api/categories`: return all names of categories
- `POST /api/categories`: add a new category
- `PUT /api/categories/:id`: modify a product name in a category
- `DELETE /api/categories/:id`: delete a category
- `GET /api/categories/:id`: get all products under that category
  - `POST /api/categories/:id`: add a new product into a category

- `GET /api/cart/:userId`: get a user's cart
- `PUT /api/cart/:userId`: update a user's cart
  - BODY: `{productId, changeNum}`

- `GET /api/address/:userId`: get a user's all address
- `GET /api/address`
