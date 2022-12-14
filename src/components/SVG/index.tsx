import { chakra, useColorModeValue } from '@chakra-ui/react'

const icons = {
  triangle: {
    shape: (
      <polygon
        strokeWidth='1px'
        strokeLinejoin='round'
        strokeMiterlimit='10'
        points='14.921,2.27 28.667,25.5 1.175,25.5 '
      />
    ),
    viewBox: `0 0 30 30`,
  },
  circle: {
    shape: (
      <path d='M15,30A15,15,0,1,1,30,15,15,15,0,0,1,15,30ZM15,6.23A8.77,8.77,0,1,0,23.77,15,8.77,8.77,0,0,0,15,6.23Z' />
    ),
    viewBox: `0 0 30 30`,
  },
  box: {
    shape: (
      <path d='M28,2V28H2V2H28m.13-2H1.88A1.88,1.88,0,0,0,0,1.88V28.13A1.88,1.88,0,0,0,1.88,30H28.13A1.87,1.87,0,0,0,30,28.13V1.88A1.88,1.88,0,0,0,28.13,0Z' />
    ),
    viewBox: `0 0 30 30`,
  },
  hexa: {
    shape: (
      <polygon
        strokeLinejoin='round'
        strokeMiterlimit='10'
        points='27.5,21.904 15,28.809  2.5,21.904 2.5,8.095 15,1.19 27.5,8.095 '
      />
    ),
    viewBox: `0 0 30 30`,
  },
  heart: {
    shape: (
      <path d='M25 39.7l-.6-.5C11.5 28.7 8 25 8 19c0-5 4-9 9-9 4.1 0 6.4 2.3 8 4.1 1.6-1.8 3.9-4.1 8-4.1 5 0 9 4 9 9 0 6-3.5 9.7-16.4 20.2l-.6.5zM17 12c-3.9 0-7 3.1-7 7 0 5.1 3.2 8.5 15 18.1 11.8-9.6 15-13 15-18.1 0-3.9-3.1-7-7-7-3.5 0-5.4 2.1-6.9 3.8L25 17.1l-1.1-1.3C22.4 14.1 20.5 12 17 12z' />
    ),
    viewBox: `0 0 30 30`,
  },
}

type IconType = 'triangle' | 'circle' | 'hexa' | 'box' | 'heart'

type SVGProps = {
  stroke?: boolean
  color?: string | number | any
  width: number
  icon: IconType
  zIndex?: number
  left: string
  top: string
  hiddenMobile?: boolean
}

const SVG = ({
  stroke = false,
  color = `${[`gray`, `brand`, `pink`, `green`][Math.floor(Math.random() * 4)]}.${
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useColorModeValue([`500`, `600`, `700`, `800`, `900`], [`50`, `100`, `200`, `300`, `400`])[
      Math.floor(Math.random() * 5)
    ]
  }`,
  zIndex = -500,
  width,
  icon,
  left,
  top,
  hiddenMobile = false,
}: SVGProps): JSX.Element => (
  <chakra.svg
    sx={{
      position: `absolute`,
      stroke: stroke ? `currentColor` : `none`,
      fill: stroke ? `none` : `currentColor`,
      display: hiddenMobile ? { base: `none`, md: `block` } : `block`,
      overflow: `visible`,
      color,
      zIndex,
      width,
      left,
      top,
      filter: `blur(8px) saturate(160%)`,
    }}
    viewBox={icons[icon].viewBox}
  >
    {icons[icon].shape}
  </chakra.svg>
)

export default SVG;