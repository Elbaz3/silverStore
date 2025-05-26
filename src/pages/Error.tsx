import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { LottieHandler } from "@components/feedback"

const Error = () => {


  return (
    <Container className="not-found">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <LottieHandler type="notFound" message="page not found" />
        <Link to="/" replace={true}>You Are Lost Go to Home</Link>
      </div>
    </Container>
  )
}

export default Error