import React from 'react'
import { Form, Input, Button } from 'antd';
import styled from '@emotion/styled';
import { Layout, Typography } from 'antd';

const Container = styled.div({
    margin: '5rem auto',
    width: '500px',

})


export default function Login() {
    const { Title } = Typography;
    const onFinish = (values: { email: string, password: string }) => {
        console.log('Success:', values);
    };
    return (
        <Layout style={{ backgroundColor: 'white' }}>
            <Container>
                <Title style={{ color: '#ff7f3f' }}>My Chat App</Title>
                <Form
                    initialValues={{}}
                    onFinish={onFinish}>
                    <Form.Item name="email"
                        rules={[{ required: true, message: 'Please enter your email!' }]}>
                        <Input type="email" autoComplete="off" placeholder="Email address" />
                    </Form.Item>

                    <Form.Item name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}>
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Container>
        </Layout>
    )
}
