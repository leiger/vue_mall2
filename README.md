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
- jump to the my github
- toggle between signin/nickName+signOut btn
  - sign in btn
    - click open form modal
  logout
    - confirm logout

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
- change quantity
  - two parameters: id, quantity
    - quantity need > 0
  - post to server. If num===0, delete it. get cart list from vuex -> change total money
  - fail: 
    - error: alert(reflesh page)
    - not login: session expired
- delete checked in database



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
  - 2: can't find the user