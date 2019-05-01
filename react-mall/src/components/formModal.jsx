import React, {Component} from 'react';
import {Modal, Form, Icon, Input, Alert} from 'antd';

const FormItem = Form.Item;

class FormModal extends Component {
  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

      }
      console.log(values);
      this.props.onLoginformSubmit(values);
    });
  };

  render() {
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    const {modalShow, onModalToggle} = this.props;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Modal
          title="LOGIN FORM"
          centered={true}
          visible={modalShow}
          okText="LOGIN"
          okButtonProps={{disabled: this.hasErrors(getFieldsError())}}
          onOk={this.handleSubmit}
          onCancel={onModalToggle}
        >
          <Alert
            message="Username: test, Password: test"
            type="info"
            showIcon
            style={{marginBottom: 24}}
          />
          <FormItem
            validateStatus={usernameError ? 'error' : ''}
            help={usernameError || ''}
          >
            {getFieldDecorator('username', {
              rules: [{required: true, message: 'Please input your username!'}],
            })(
              <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="username"/>
            )}
          </FormItem>
          <FormItem
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [{required: true, message: 'Please input your Password!'}],
            })(
              <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                     placeholder="Password"/>
            )}
          </FormItem>
        </Modal>
      </Form>
    );
  }
}

const FormModalWrapper = Form.create()(FormModal);
export default FormModalWrapper;
