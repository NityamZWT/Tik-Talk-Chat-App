import React from 'react'

export default async function ProductSlug({params}) {
    const {slug} = await params;
  return (
    <div>ProductSlug: {slug[0]}{slug[1]}</div>
  )
}
export async function generateStaticParams() {
  return [
    { slug: ["electronics", "phones"] },
    { slug: ["electronics", "laptops"] },
    { slug: ["fashion", "men"] },
  ]
}