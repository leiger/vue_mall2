import React, {Component} from 'react';
import {Row, Col, Card, Divider, Button} from 'antd';
import styled from 'styled-components';

const maps = [];
for (let i = 1; i <= 9; i++) {
  const e = require(`../images/${i}.jpg`);
  maps.push(e);
}

const BoxWrapper = styled.div`
  margin-top: 18px;
`;

const ImgWrapper = styled.img`
  display: block;
  height: 150px;
  margin: auto;
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header4 = styled.h4`
  font-color: #333;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Price = styled.p`
  color: #2d8cf0;
  margin-bottom: 0;
`;

class GoodsList extends Component {
  render() {

    const {goods} = this.props;
    return (
      <BoxWrapper>
        <Row type="flex" gutter={16}>
          {goods.map((good, index) => (
            <Col key={good.productId} span={6} style={{marginBottom: 18}}>
              <Card
                hoverable
              >
                <ImgWrapper
                  src={maps[index]}
                  alt="img"
                  height={150}
                />
                <Divider/>
                <Description>
                  <div>
                    <Header4>{good.productName}</Header4>
                    <Price>{good.productPrice}</Price>
                  </div>

                  <Button
                    type="dashed"
                    shape="circle"
                    icon="shopping-cart"
                  />
                </Description>
              </Card>
            </Col>
          ))}
        </Row>
      </BoxWrapper>

    );
  }
}

export default GoodsList;
