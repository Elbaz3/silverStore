import Lottie from "lottie-react"
import notFound from '@assets/lottiefiles/notfound.json'
import error from '@assets/lottiefiles/error.json'
import empty from '@assets/lottiefiles/empty.json'
import loading from '@assets/lottiefiles/loadingLotti.json'
import success from '@assets/lottiefiles/success.json'

const lottieFiles = {
   notFound,
   error,
   empty,
   loading,
   success
}

type TLottieProps = {
   type: keyof typeof lottieFiles
   message?: string | null
   className?: string
}


const LottieHandler = ({ type, message, className }: TLottieProps) => {
  
   const LottieType = lottieFiles[type]
   const messageStyle =
   type === "error"
     ? { fontSize: "19px", color: "red" }
     : { fontSize: "19px", marginTop: "15px" };


   return (
    <div className={`d-flex flex-column align-items-center ${className}`} >
      <Lottie animationData={LottieType} style={{ width: "300px" }}/>
      {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  )
}

export default LottieHandler