import { TwitterLogoIcon } from '@radix-ui/react-icons'
import React from 'react'

type XShareButtonProps = {
  url: string
  ogImageUrl: string
}

const XShareButton = ({ url, ogImageUrl }: XShareButtonProps) => {
  const _url = new URL('https://twitter.com/intent/tweet')
  _url.searchParams.set('hashtags', '画HACK')
  _url.searchParams.set('url', url)
  _url.searchParams.set('image', ogImageUrl)
  return (
    <a className='p-2' href={_url.toString()} rel='noopener noreferrer' target='_blank'>
      <TwitterLogoIcon className='size-5' />
    </a>
  )
}

export default XShareButton
