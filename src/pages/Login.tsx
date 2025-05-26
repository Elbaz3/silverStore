import { Heading } from "@components/common";
import  Input  from "@components/forms/input/input";
import useLogin from "@hooks/useLogin";
import { Form, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const Login = () => {

  const { loading, error, accessToken, register, handleSubmit, submitForm, errors, searchParams } = useLogin()

  if (accessToken) {
    return (
       <Navigate to='/' />
    )
 }

  return (
    <>
      <Heading title="User Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
        {searchParams.get('message') === 'account_created' && (<Alert variant="success" >Your account successfully created, please login</Alert>)}
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              name="email"
              label="Email Address"
              register={register}
              error={errors.email?.message}
            />
            <Input
              type="password"
              name="password"
              label="Password"
              register={register}
              error={errors.password?.message}
            />
            <Button variant="info" type="submit" style={{ color: "white" }} 
              disabled= {loading === 'pending' ? true : false}
            >
              {
                loading === 'pending'
                ? (
                  <>
                    <Spinner animation="border" size="sm" ></Spinner> loading...
                  </>
                ) : (
                  <>
                    Submit
                  </>
                )
              }
            </Button>
            {error && <p>{error}</p>}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;