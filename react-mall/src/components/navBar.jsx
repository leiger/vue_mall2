import React, {Component, PropTypes} from 'react';
import {Row, Col, Icon, Button, Divider} from 'antd';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import FormModal from './formModal';

const Wrapper = styled.div`
  background: #fff;
  border-bottom: 1px solid #e8eaec;
  height: 60px;
`;

const HeaderWrapper = styled.header`
  width: 95%;
  margin: auto;
`;

const Logo = styled.h1`
  line-height: 60px;
  color: rgba(0,0,0,.9);
  font-size: 18px;
`;

const ButtonWrapper = styled.div`
  float: right;
  height: 60px;
  line-height: 60px;
`;

class NavBar extends Component {

  getGroupButton = displayName => {
    const githubButton = <Button type="dashed" shape="circle" icon="github"/>;
    const divider = <Divider type="vertical"/>;

    const notLogin = (
      <React.Fragment>
        {githubButton}
        {divider}
        <Button
          type="dashed"
          shape="circle"
          icon="login"
          onClick={this.props.onModalToggle}
        />
      </React.Fragment>
    );
    const login = (
      <React.Fragment>
        {githubButton}
        {divider}
        <Button type="dashed" shape="circle" icon="shopping-cart"/>
        {divider}
        {displayName}
        {divider}
        <Button type="dashed" shape="circle" icon="logout"/>
      </React.Fragment>
    );

    return displayName ? login : notLogin;
  };

  componentDidMount() {

  };

  render() {
    const {appName, displayName, onModalToggle, onLoginformSubmit, modalShow} = this.props;
    return (
      <Wrapper>
        <HeaderWrapper>
          <Row type="flex" justify="space-between">
            <Col span={4}>
              <Logo>
                <Link to="/goods">{appName}</Link>
              </Logo>
            </Col>

            <Col span={8}>
              <ButtonWrapper>
                {this.getGroupButton(displayName)}
              </ButtonWrapper>
            </Col>
          </Row>
          {/*login modal*/}
          <FormModal
            modalShow={modalShow}
            onModalToggle={onModalToggle}
            onLoginformSubmit={onLoginformSubmit}
          />
        </HeaderWrapper>
      </Wrapper>
    );
  }
}

export default NavBar;
