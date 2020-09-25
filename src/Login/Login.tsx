import React from 'react'
import { Form, Input, Button } from 'antd';
import styled from '@emotion/styled';
import { Layout } from 'antd';

const Container = styled.div({
    margin: '5rem auto',
    width: '40%',
})


export default function Login() {
    const onFinish = (values: string) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Layout style={{ backgroundColor: 'white' }}>
            <Container>
                <Form {...{ labelCol: { span: 5 }, wrapperCol: { span: 10 }, }}
                    initialValues={{}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>
                    <Form.Item label="Email" name="email"
                        rules={[{ required: true, message: 'Please enter your email!' }]}>
                        <Input type="email" />
                    </Form.Item>

                    <Form.Item label="Password" name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...{ wrapperCol: { offset: 5, span: 10 }, }}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Container>
        </Layout>
    )
}
