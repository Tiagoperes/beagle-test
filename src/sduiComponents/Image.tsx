import React, { FC } from 'react'

interface Props {
  url: string,
  description: string,
  width?: number,
  height?: number,
}

const Image: FC<Props> = ({ url, description, width, height }) => (
  <img src={url} alt={description} style={{ width, height }} />
)

export default Image
