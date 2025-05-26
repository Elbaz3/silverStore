import { Heading } from '@components/common';
import Input from '@components/forms/input/input';
import useSignUp from '@hooks/useSignUp';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

const SignUp = () => {
  const { loading, error, accessToken, handleSubmit, submitForm, register, errors, getFieldState, emailOnBlurHandler, emailAvailabilityStatus } = useSignUp()
  if (accessToken) {
    return (
       <Navigate to='/' />
    )
 }

  return (
    <>
      <Heading title='Sign Up' />
      <Row>
        <Col md= {{span: 6, offset: 3}}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input 
              label='First Name'
              type='text'
              name='firstName'
              register={register}
              error={errors.firstName?.message}
              success={
                getFieldState("firstName").isDirty &&
                !getFieldState("firstName").invalid
                  ? "valid!"
                  : ""
              }
            />
            <Input 
              label='Last Name'
              type='text'
              name='lastName'
              register={register}
              error={errors.lastName?.message}
              success={
                getFieldState("firstName").isDirty &&
                !getFieldState("firstName").invalid
                  ? "valid!"
                  : ""
              }
            />
            <Input
              label="Email Address"
              name="email"
              register={register}
              onBlur={emailOnBlurHandler}
              error={
                errors.email?.message
                  ? errors.email?.message
                  : emailAvailabilityStatus === "unavailable"
                  ? "This email is already in use."
                  : emailAvailabilityStatus === "failed"
                  ? "Error from the server."
                  : ""
              }
              formText={
                emailAvailabilityStatus === "checking"
                  ? "We're currently checking the availability of this email address. Please wait a moment."
                  : ""
              }
              success={
                emailAvailabilityStatus === "available"
                  ? "This email is available for use."
                  : ""
              }
              disabled={emailAvailabilityStatus === "checking" ? true : false}
            />
            <Input
              type="password"
              label="Password"
              name="password"
              register={register}
              error={errors.password?.message}
            />
            <Input
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              register={register}
              error={errors.confirmPassword?.message}
            />
            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={emailAvailabilityStatus === "checking" || loading === 'pending'}
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

  )
}

export default SignUp