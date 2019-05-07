# vue_mall
a mall written by vue
function: add to cart, sort, filter, login, logout...

old repository address: [newMall](https://github.com/leiger/newMall)

### client
using vue.js, vuex, vue-router, axios, iview, yarn and some other technologies
```
cd client
npm install
npm start
```

### Plan
#### goods details
#### modify database
#### animation
#### store rewrite
---
### 05-04
#### filter by category
#### animation
#### delay load
#### large image
#### register
#### logo design
#### error log collection

### server
using express and mongondb
```
cd server
npm install
node /bin/www
```
### service
#### getCartList

### components
#### EntryBoard
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

#### LoginModal
- login form
- login check
  - exist?
  - info
- third part login(icon)
- username and password
- after login
  - send ajax request: get nickName, cartList, close modal

#### NavHeader
- logo
- navbar
- cart 
  - login depend on the nickName === '' or not 
  - login ? show nums: hide
- contain LoginModal&Drawer components: reduce reuse in other pages

#### Drawer
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

#### Article
- props: postTitle

### Server
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

### Error code
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

### backend API
- /user
  - /login: params: {username, password}
  - /logout
  - /checkLogin
  - /signup
    - hash password
- /good
  - /product: find one product
  - /list: params: {page, pageSize, sortFlag, sortWay, priceLevel}
    - return a list of products
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


#### check login
- main.js: router.beforeEach, not login can't visit some pages
- EntryBoard: used to get userName and id -> set this in vuex & display change