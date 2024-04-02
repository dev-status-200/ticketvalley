import ProductPage from '/Components/Layouts/Product';

export default function product({ id, tourData }) {
    return (
        <ProductPage id={id} tourData={tourData} />
    )
}

export async function getStaticProps(ctx) {
    const res = await fetch(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_SLUG,{
        headers:{
            id:ctx.params.id
        }
    })
    const tourData = await res.json();
    return {
        props: {
            tourData,
            id:tourData.result.id
        }
    }
}

export async function getStaticPaths() {
    const res = await fetch(process.env.NEXT_PUBLIC_GET_PRODUCT_SLUGS, {
        headers:{type:'product'}
    })
    const posts = await res.json();

    const paths = posts?.result?.map((post) => ({
        params: { id: post.slug },
    }));
    return { paths, fallback: false }
}

// import Product from '/Components/Layouts/Product';
// import axios from 'axios';

// export default function product({ id, tourData }) {
//   return (<Product id={id} tourData={tourData} />)
// }

// product.getInitialProps = async({query}) => {
//   const tourData = await axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_ID,{
//     headers:{
//       'id':`${query.id}`
//     }
//   }).then((x)=>x.data)
//   return{
//     id:query.id,
//     tourData
//   }
// }