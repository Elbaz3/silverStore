import ContentLoader from "react-content-loader"

const CartSkeleton = () => {
  return (
      <ContentLoader 
         speed={2}
         width={270}
         height={180}
         viewBox="0 0 270 180"
         backgroundColor="#d2cbcb"
         foregroundColor="#ecebeb"
      >
         <rect x="-1" y="0" rx="0" ry="0" width="130" height="180" /> 
         <rect x="148" y="29" rx="0" ry="0" width="80" height="10" /> 
         <rect x="148" y="10" rx="0" ry="0" width="99" height="10" /> 
         <rect x="141" y="147" rx="6" ry="6" width="120" height="29" />
      </ContentLoader>
  )
}

export default CartSkeleton