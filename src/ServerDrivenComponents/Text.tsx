import React, { FC } from 'react'

interface Props {
  value: string,
}

const Text: FC<Props> = ({ value }) => (
  <p>{value}</p>
)

export default Text
