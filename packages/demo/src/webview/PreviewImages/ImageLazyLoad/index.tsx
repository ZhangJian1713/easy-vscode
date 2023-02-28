// import { useInViewport } from 'ahooks'
import { Image } from 'antd'
import React from 'react'

interface IImageLazyLoadProps {
  enableLazyLoad: boolean
  src: string
  size: number
  backgroundColor: string
}

/**
 *
 * @param props
 * @returns
 */
const ImageLazyLoad: React.FC<IImageLazyLoadProps> = ({ src, size, backgroundColor }) => {
  return <Image width={size} height={size} style={{ backgroundColor, objectFit: 'contain' }} src={src} />
}

export default ImageLazyLoad
