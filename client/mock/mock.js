const Mock = require('mockjs');

// get mock.Random object
const Random = Mock.Random;

const goodsData = () => {
  let result = [];

  for(let i = 0; i < 10; i++) {
    let good = {
      productId: 10000 + i,
      productName: Random.title(4),
      productPrice: Random.integer(1000, 5000),
      productImg: Random.dataImage('200x200', 'mock_img')
    };
    results.push(good)
  }

  let goods = {
    "status": "0",
    "msg": "",
    result
  };

  return goods;
};

// Mock.mock(url, post/get, response)
Mock.mock('/goods', 'get', goodsData());
