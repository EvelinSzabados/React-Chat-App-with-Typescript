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
    const [form] = Form.useForm();

    const auth = async (email: string, password: string) => {
        if (email === 'evelin@gmail.com' || password === 'password') {
            return true;
        }
        return false;
    }
    const onFinish = async (values: { email: string, password: string }) => {

        if (await auth(values.email, values.password)) {
            console.log("Successful sign in")
            form.resetFields();
        }
    };

    return (
        <Layout style={{ backgroundColor: 'white' }}>
            <Container>
                <Title style={{ color: '#ff7f3f' }}>My Chat App</Title>
                <Form
                    form={form}
                    initialValues={{}}
                    onFinish={onFinish}>
                    <Form.Item name="email" shouldUpdate
                        rules={[{ required: true, message: 'Please enter your email!' }]}>
                        <Input type="email" placeholder="Email address" />
                    </Form.Item>

                    <Form.Item name="password" shouldUpdate
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
