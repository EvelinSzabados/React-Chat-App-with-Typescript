import React, { useContext } from 'react'
import { Form, Input, Button } from 'antd';
import styled from '@emotion/styled';
import { Layout, Typography } from 'antd';
import { auth } from './Auth';
import { RouteComponentProps } from 'react-router';
import { UserContext } from '../Context/UserContext';
import { Statuses } from '../Context/StatusTypes';

interface ChildComponentProps extends RouteComponentProps { }

const Container = styled.div({
    margin: '5rem auto',
    width: '500px',
})

export default function Login(props: ChildComponentProps): JSX.Element {
    const { Title } = Typography;
    const [form] = Form.useForm();
    const { setCurrentUser } = useContext(UserContext);

    const onFinish = async (values: { email: string, password: string }) => {
        auth(values.email).then(userData => {
            if (userData.length > 0) {
                userData[0].status = Statuses.Active;
                setCurrentUser(userData[0])
                props.history.push("/dashboard")

            } else {
                alert("No account found! Sign up!")
            }
        });
    };

    return (
        <Layout style={{ backgroundColor: 'white' }}>
            <Container>
                <Title style={{ color: '#ff7f3f' }}>My Chat App</Title>
                <Title level={3} type="secondary">Sign in</Title>
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
                        <p>Don't have an account? <a href="/signup">Sign up now!</a></p>
                        <Button type="primary" htmlType="submit">Submit</Button>

                    </Form.Item>
                </Form>
            </Container>
        </Layout>
    )
}
