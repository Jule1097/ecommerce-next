import EditProduct from '/components/EditProduct'
import { useRouter } from 'next/router'

const products = () => {

    const router = useRouter()
    const { id } = router.query
    
    return ( <EditProduct id={id}></EditProduct> );
}
 
export default products;