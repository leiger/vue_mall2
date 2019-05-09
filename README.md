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
- `/collections/:collectionName`: collection and all products in it
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
- goods
  - productId
  - category
    - 01: Smart Devices
    - 02: Outdoor
    - 03: Steam TV
    - 04: Mobile Phone Accessories
    - 05: Laptop
  - productName
  - salePrice
  - productImage

#### Error code
- status
  - 0: success
  - 1: fatal error
  - 2: Wrong Username or Password!
  - 3: not login
  - 4: cart edit error
  - 5: not have this order
  - 6: session expired
  - 7: User exist
  - 8: invalid data
  - 9: hash error
  - 10: save new user error
  - 11: can't find the user
  - 12: pay error

#### API
- /api
  - /user
    - /login: params: {username, password}
    - /logout
    - /checkLogin
    - /signup
      - hash password
  - /products
    - / params: {page, pageSize, sortFlag, sortWay, priceLevel}
      - GET: get all products
    - /:id
  - /cart
    - /cartList: return user's cart list
    - /cartEdit: edit the number of goods in cart
    - /addCart: add product to cart
    - /delCart: delete product from cart
  - /address
    - /addressList: return addressList
    - /setDefault: set Default address
    - /delAddress: delete address
    - /getAddress: return one address 
  - /payment
    - /payment: 
  - /order
    - /orderDetail
---

### Plan
- products details
- modify database
- filter by category
- delay load
- large image
- logo design
- error log collection

---

### bugs
  - login twice
  - browser compatibility

---

### New Design
#### REST API
- `GET /api/session`: get session/login status
- `POST /api/session`: login and save sessions
  - BODY: `{username: '', password: ''}`
- `DELETE /api/session`: destroys session and redirect to / 

- `POST /api/users`: records the entered information into database as a new /users/username
- `GET /api/users/{name}`: gets the current user data in a profile view
- `PUT /api/users/{name}`: updates new information about user

- `GET /api/collections/{name}`
- `GET /api/collections/`