import { TwitterLogoIcon } from '@radix-ui/react-icons'
import React from 'react'

type XShareButtonProps = {
  url: string
}

const XShareButton = ({ url }: XShareButtonProps) => {
  const _url = new URL('https://twitter.com/intent/tweet')
  _url.searchParams.set('hashtags', '画HACK')
  _url.searchParams.set('url', url)
  return (
    <a className='p-2' href={_url.toString()} rel='noopener noreferrer' target='_blank'>
      <TwitterLogoIcon className='size-5' />
    </a>
  )
}

export default XShareButton
