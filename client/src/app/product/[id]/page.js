import React from 'react'

async function Product({ params }) {
    const productId = await params.id
  return (
    <div>Product {productId}</div>
  )
}

export default Product