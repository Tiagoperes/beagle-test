import React, { FC } from 'react'

interface Props {
  url: string,
  description: string,
}

const Image: FC<Props> = ({ url, description }) => (
  <img src={url} alt={description} />
)

export default Image
