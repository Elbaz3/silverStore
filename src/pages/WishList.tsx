import useWishList from '@hooks/useWishList'
import { GridList, Heading } from '@components/common'
import { Product } from '@components/eCommerce'
import { Loading } from '@components/feedback'


const WishList = () => {

  const { records, isLoading, error, user } = useWishList()


  if (!user) {
    return (
      <Loading loading={isLoading} error={error} type='product'>
        <Heading title="Wishlist" />
        <p style={{ textAlign: 'center' }}>You need to login first to add this item to your wishlist.</p>
      </Loading>
    )
  } 

  return (
    <Loading loading={isLoading} error={error} type='product'>
      <Heading title="Wishlist" />
      <GridList
        message='no products found'
        records={records}
        renderItem={(record) => <Product key={record.id} {...record} userId={user.id} />}
      />
    </Loading>
  )
}

export default WishList