import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'

const { container, basketQuantity, pumpAnimate } = styles

type THeaderCounterProps = {
  totalQuantity: number,
  svgLogo: React.ReactNode,
  page: string
}

const HeaderCounter = ({ totalQuantity, svgLogo, page }: THeaderCounterProps) => {
  const [ isAnimated, setIsAnimated ] = useState(false)
  const quantityStyle = `${basketQuantity} ${isAnimated ? pumpAnimate : ''}`
  const navigate = useNavigate()



  useEffect(() => {


    if (totalQuantity === 0) return
    setIsAnimated(true)
    const debounce = setTimeout(() => {
      setIsAnimated(false)
    }, 300)

    return () => {
      clearTimeout(debounce)
    }
  }, [ totalQuantity ])

  return (
    <div className={container} onClick={() => navigate(page)}>
      {svgLogo}
      <div className={quantityStyle}>{totalQuantity}</div>
    </div>
  )
}

export default HeaderCounter