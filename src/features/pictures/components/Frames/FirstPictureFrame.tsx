import React from 'react'
import { styled } from 'styled-components'

type FirstPictureFrameProps = {
  children: React.ReactNode
}

const OuterFrame = styled.div`
  background-color: #eefbf8;
  background-image: radial-gradient(
      circle,
      hsla(0, 0%, 100%, 0.1),
      hsla(0, 0%, 0%, 0.75)
    ),
    linear-gradient(left, transparent 50%, hsla(0, 0%, 0%, 0.01) 50%);
  background-position:
    50% 50%,
    50% 50%;
  background-repeat: no-repeat, repeat;
  position: relative
  background-size:
    150% 150%,
    2em 2em;
  height: 200px
`

const Frame = styled.div`
  background-color: #fff;
  box-shadow:
    inset 0 0 2px hsla(0, 0%, 0%, 0.2),
    0 2px 1px hsla(0, 0%, 100%, 0.75),
    0 -1px 1px 2px hsla(0, 0%, 0%, 0.1);
  height: 6em;
  left: 100%;
  top: 100%;
  margin: -8.875em -12.5em;
  position: absolute;
  width: 9em;
  &:before {
    background-color: #22130c;
    bottom: -2.25em;
    box-shadow:
      inset 0 1px 1px 1px hsla(0, 0%, 100%, 0.2),
      inset 0 -2px 1px hsla(0, 0%, 0%, 0.4),
      0 5px 50px hsla(0, 0%, 0%, 0.25),
      0 20px 20px -15px hsla(0, 0%, 0%, 0.2),
      0 30px 20px -15px hsla(0, 0%, 0%, 0.15),
      0 40px 20px -15px hsla(0, 0%, 0%, 0.1);
    content: '';
    left: -2.25em;
    position: absolute;
    right: -2.25em;
    top: -2.25em;
    z-index: 1;
  }
  &:after {
    background-color: #fff5e5;
    bottom: -1.5em;
    box-shadow:
      0 2px 1px hsla(0, 0%, 100%, 0.2),
      0 -1px 1px 1px hsla(0, 0%, 0%, 0.4),
      inset 0 2px 3px 1px hsla(0, 0%, 0%, 0.2),
      inset 0 4px 3px 1px hsla(0, 0%, 0%, 0.2),
      inset 0 6px 3px 1px hsla(0, 0%, 0%, 0.1);
    content: '';
    left: -1.5em;
    position: absolute;
    right: -1.5em;
    top: -1.5em;
    z-index: 1;
  }
`

export const FirstPictureFrame = React.memo(({ children }: FirstPictureFrameProps) => {
  return (
    <>
      <OuterFrame>
        <Frame>{children}</Frame>
      </OuterFrame>
    </>
  )
})

FirstPictureFrame.displayName = 'FirstPictureFrame'
