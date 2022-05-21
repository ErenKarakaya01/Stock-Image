import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import React, { useState } from 'react'


interface Image {
  image_id: number,
  name: string,
  category: string,
  price: number,
  base64_url: string,
  resolution: string,
  size: string,
  extension: string,
  upload_date: string,
}

const Image = ({ image }: { image: Image }) => {
  return (
    <div>{image.image_id}</div>
  )
}

export default Image

const data1 = [
  { image_id: 1, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz1.jpg", resolution: "1x1", size: "1mb", extension: ".jpg", upload_date: "1.2.2001" },
  { image_id: 2, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz1.jpg", resolution: "1x1", size: "1mb", extension: ".jpg", upload_date: "1.2.2001" },
  { image_id: 3, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz1.jpg", resolution: "1x1", size: "1mb", extension: ".jpg", upload_date: "1.2.2001" },
  { image_id: 4, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz1.jpg", resolution: "1x1", size: "1mb", extension: ".jpg", upload_date: "1.2.2001" },
  { image_id: 5, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz1.jpg", resolution: "1x1", size: "1mb", extension: ".jpg", upload_date: "1.2.2001" },
]

export const getStaticPaths = (url: object) => {
  /* url.params.id */
  return {
    paths: data1.map(v => {
      return {
        params: {
          id: (v.image_id - 1).toString()
        }
      }
    }),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (url: any) => {
  
  return {
    props: {
      image: data1[url.params.id]
    }
  }
}
