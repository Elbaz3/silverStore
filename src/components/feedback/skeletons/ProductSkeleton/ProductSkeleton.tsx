import ContentLoader from "react-content-loader"
import { Row, Col } from "react-bootstrap";

const ProductSkeleton = () => {

      const renderSkeleton = Array(4).fill(0).map((_, index) => 
      (
      <Col key={index} sx={3} className="d-flex justify-content-center mb-5 mt-2">
         <ContentLoader 
            speed={2}
            width={130}
            height={320}
            viewBox="0 0 125 320"
            backgroundColor="#d2cbcb"
            foregroundColor="#ecebeb"
         >
            <rect x="1" y="5" rx="0" ry="0" width="130" height="180" /> 
            <rect x="6" y="202" rx="0" ry="0" width="99" height="10" /> 
            <rect x="6" y="222" rx="0" ry="0" width="99" height="10" /> 
            <rect x="6" y="241" rx="0" ry="0" width="99" height="10" /> 
            <rect x="5" y="274" rx="6" ry="6" width="120" height="29" />
         </ContentLoader>
      </Col>
      ))
   

  return (
   <Row>{renderSkeleton}</Row>

  )

}

export default ProductSkeleton