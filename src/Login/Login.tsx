import React, { useContext } from 'react'
import { Form, Input, Button } from 'antd';
import styled from '@emotion/styled';
import { Layout, Typography } from 'antd';
import { RouteComponentProps } from 'react-router';
import { UserContext } from '../Context/UserContext';
import { gql, useMutation } from '@apollo/client';
import { ValidLoginContext } from "../Context/ValidLoginContext"

interface ChildComponentProps extends RouteComponentProps { }

const Container = styled.div({
    margin: '5rem auto',
    width: '500px',
})

export default function Login(props: ChildComponentProps): JSX.Element {
    const { Title } = Typography;
    const [form] = Form.useForm();
    const { setCurrentUser } = useContext(UserContext);
    const { setValidLogin } = useContext(ValidLoginContext)

    const LOGIN_MUTATION = gql`
        mutation login($email: String! ,$password: String!) {
            login(email: $email, password: $password) {
                token,
                user{id,email,displayName,profilePictureUrl,status}
            }
        }
  `;
    const [login] = useMutation(LOGIN_MUTATION, { fetchPolicy: 'no-cache' });

    const onFinish = async (values: { email: string, password: string }) => {

        login({ variables: { email: values.email, password: values.password } })
            .then((response: any) => {
                setCurrentUser(response.data.login.user)
                sessionStorage.setItem('user', 'true');
                setValidLogin(true)
                props.history.push("/dashboard")


            }).catch((error: any) => alert("No account found! Try again!"))

    }

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
