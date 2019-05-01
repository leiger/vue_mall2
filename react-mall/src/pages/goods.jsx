import React, {Component} from 'react';
import {connect} from 'react-redux';
import GoodsList from '../components/goodsList';
import {Row, Col} from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  width: 95%;
  margin: auto;
`;

class Goods extends Component {
  render() {
    const {goods} = this.props;

    return (
      <Container>
        <Row>
          <Col span={6}>

          </Col>
          <Col span={18}>
            <GoodsList
              goods={goods}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  goods: state.goods
});

export default connect(mapStateToProps)(Goods);
