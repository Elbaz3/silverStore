import ContentLoader from "react-content-loader"
import { Row, Col } from "react-bootstrap";

const CategorySkeleton = () => {

   const renderSkeleton = Array(4).fill(0).map((_, index) => 
      (
      <Col key={index} sx={3} className="d-flex justify-content-center mb-5 mt-2">
         <ContentLoader 
            speed={2}
            width={180}
            height={180}
            viewBox="0 0 180 180"
            backgroundColor="#d2cbcb"
            foregroundColor="#ecebeb"
         >
            <rect x="59" y="160" rx="3" ry="3" width="52" height="7" /> 
            <circle cx="84" cy="82" r="68" />
         </ContentLoader>
      </Col>
      ))
   

  return (
   <Row>{renderSkeleton}</Row>

  )
}

export default CategorySkeleton