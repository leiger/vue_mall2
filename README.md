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
- contain LoginModal components: reduce reuse in other pages