import {
  Stack,
  useColorModeValue,
  Box,
  chakra,
  Link as ChakraLink,
  Icon,
  Tooltip,
  Flex,
  SimpleGrid,
  useColorMode,
} from '@chakra-ui/react';
import { FaReact, FaGithub } from 'react-icons/fa';
import { SiRedux } from 'react-icons/si';
import SocialIcons from '../SocialIcons';

const Footer = (): JSX.Element => {
  const { colorMode } = useColorMode()

  return (
    <Box
      bg={useColorModeValue(`gray.50`, `gray.900`)}
      color={useColorModeValue(`gray.700`, `gray.200`)}
    >
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        gridTemplate={{ base: `1fr`, md: `1fr 1fr 1fr` }}
        mx='auto'
        maxW='7xl'
        py={4}
        px={5}
        spacing={4}
        alignItems='center'
      >
        <Flex direction='row' maxW='full' mx={{ base: `auto`, md: 5 }} alignItems='center'>
        </Flex>
        <chakra.p display='flex' alignSelf='center' mx='auto'>
          Built with...
          <Tooltip label='React'>
            <ChakraLink href='https://reactjs.org/' display='flex'>
              <FaReact
                color={useColorModeValue(`#000000`, `white`)}
                style={{
                  fontSize: '20px'
                }}
              />
            </ChakraLink>
          </Tooltip>
          /
          <Tooltip label='Redux Toolkit'>
            <ChakraLink href='https://redux-toolkit.js.org/' display='flex'>
              <SiRedux
                color={useColorModeValue(`#000000`, `white`)}
                style={{
                  fontSize: '20px'
                }}
              />
            </ChakraLink>
          </Tooltip>
          /
          <Tooltip label='TypeScript'>
            <ChakraLink href='https://www.typescriptlang.org/' display='flex'>
              <Icon
                color={useColorModeValue(`gray.800`, `white`)}
                viewBox='0 0 512 512'
                my='auto'
                mx={1}
                alignSelf='center'
              >
                <rect fill='currentColor' height='512' rx='50' width='512' />
                <rect fill='currentColor' height='512' rx='50' width='512' />
                <path
                  d='m316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386s22.823 3.129 35.135 3.129c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65s7.121-19.007 7.121-31.522c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894 4.695 1.304 9.259 2.947 13.694 4.928 4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492s-19.381-2.112-31.066-2.112c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zm-84.159-123.342h64.22v-41.082h-179v41.082h63.906v182.918h50.874z'
                  fill={useColorModeValue(`white`, `gray.800`)}
                />
              </Icon>
            </ChakraLink>
          </Tooltip>
          /
          <Tooltip label='Chakra-UI'>
            <ChakraLink href='https://chakra-ui.com/' display='flex'>
              <Icon
                color={useColorModeValue(`gray.800`, `white`)}
                viewBox='0 0 256 256'
                my='auto'
                mx={1}
                alignSelf='center'
              >
                <rect width='256' height='256' rx='128.5' fill='currentColor' />
                <path
                  d='M69.558 133.985l87.592-86.9891c1.636-1.6251 4.27.3525 3.165 2.377l-32.601 59.7521c-.728 1.332.237 2.958 1.755 2.958h56.34c1.815 0 2.691 2.223 1.364 3.462l-98.7278 92.142c-1.7702 1.652-4.4051-.676-2.9839-2.636l46.7357-64.473c.958-1.322.014-3.174-1.619-3.174H70.9673c-1.7851 0-2.6759-2.161-1.4093-3.419z'
                  fill={useColorModeValue(`white`, `gray.800`)}
                />
              </Icon>
            </ChakraLink>
          </Tooltip>
        </chakra.p>
        <Stack direction='row' spacing={6} ml='auto' mr={{ base: `auto`, md: 5 }}>
        
        </Stack>
      </SimpleGrid>
    </Box>
  );
}
export default Footer;

/*
<SocialIcons label='GitHub' href='https://github.com/eric-lu-VT/lastchances-frontend'>
  <FaGithub />
</SocialIcons>
*/