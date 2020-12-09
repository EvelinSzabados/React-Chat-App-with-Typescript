import React, { useContext } from 'react'
import { Form, Input, Button } from 'antd';
import styled from '@emotion/styled';
import { Layout, Typography } from 'antd';
import { RouteComponentProps } from 'react-router';
import { UserContext } from '../Context/UserContext';
import { useMutation } from '@apollo/client';
import { ValidLoginContext } from "../Context/ValidLoginContext"
import { SIGNUP_MUTATION } from "../Common/GraphqlQueries";

interface ChildComponentProps extends RouteComponentProps { }

const Container = styled.div({
    margin: '5rem auto',
    width: '500px',
})

export default function Signup(props: ChildComponentProps): JSX.Element {
    const { Title } = Typography;
    const [form] = Form.useForm();
    const { setCurrentUser } = useContext(UserContext);
    const { setValidLogin } = useContext(ValidLoginContext)

    const [signup] = useMutation(SIGNUP_MUTATION, { fetchPolicy: 'no-cache' });

    const onFinish = async (values: { email: string, password: string, displayName: string }) => {

        signup({ variables: { email: values.email, password: values.password, displayName: values.displayName } })
            .then((response: any) => {
                setCurrentUser(response.data.signup.user)
                sessionStorage.setItem('user', 'true');
                setValidLogin(true)
                props.history.push("/dashboard")



            }).catch((error: any) => alert("Something went wrong! Try again!"))

    }

    return (
        <Layout style={{ backgroundColor: 'white' }}>
            <Container>
                <Title style={{ color: '#ff7f3f' }}>My Chat App</Title>
                <Title level={3} type="secondary">Sign up</Title>
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

                    <Form.Item name="displayName" shouldUpdate
                        rules={[{ required: true, message: 'Please enter your displayName!' }]}>
                        <Input placeholder="DisplayName" />
                    </Form.Item>

                    <Form.Item >
                        <p>Already have an account? <a href="/">Sign in now!</a></p>

                        <Button type="primary" htmlType="submit">Submit</Button>

                    </Form.Item>
                </Form>
            </Container>
        </Layout>
    )
}
