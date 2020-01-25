import React, { FC } from 'react'

interface Props {
  url: string,
  description?: string,
  style?: Record<string, any>,
}

const Image: FC<Props> = ({ url, description, style }) => (
  <img src={url} alt={description} style={style} />
)

export default Image
