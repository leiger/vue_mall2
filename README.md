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
#### REST API
- `POST /api/auth`: login and save sessions
  - BODY: `{username: '', password: '', admin: true/false}`
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

- `GET /api/addresses/:userId`: get a user's all address
- `GET /api/addresses/:userId/:addressId`
- `POST /api/addresses/:userId`
- `PUT /api/addresses/:userId/:addressId`
- `DELETE /api/addresses/:userId/:addressId`

- `GET /api/orders/:userId`
- `GET /api/orders/:userId/:orderId`
- `POST /api/orders/:userId`
- `PUT /api/orders/:userId/:orderId`
- `DELETE /api/orders/:userId/:orderId`

#### database
- users
  - _id
  - email
  - password
  - admin
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

### bugs
  - objectId num wrong 500 error
  - 

---

200: '服务器成功返回请求的数据。',
201: '新建或修改数据成功。',
202: '一个请求已经进入后台排队（异步任务）。',
204: '删除数据成功。',
400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
401: '用户没有权限（令牌、用户名、密码错误）。',
403: '用户得到授权，但是访问是被禁止的。',
404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
406: '请求的格式不可得。',
410: '请求的资源被永久删除，且不会再得到的。',
422: '当创建一个对象时，发生一个验证错误。',
500: '服务器发生错误，请检查服务器。',
502: '网关错误。',
503: '服务不可用，服务器暂时过载或维护。',
504: '网关超时。',