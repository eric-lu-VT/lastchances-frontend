import React from 'react';
import { 
  Box, 
  Flex,
  useColorModeValue,
  Spacer,
} from '@chakra-ui/react';
import ToggleTheme from '../ToggleTheme';
import UpDown from '../Animations';
import SVG from '../SVG';
import Footer from '../Footer';

interface AppLayoutProps {
  children: React.ReactElement
}

const AppLayout = ({ children }: AppLayoutProps): JSX.Element => {
  return (
    <>
      <Flex
        alignItems='right'
        paddingTop='3'
        paddingRight='3'
      >
        <Spacer />
        <ToggleTheme />
      </Flex>
      <UpDown type='normal'>
        <SVG icon='heart' width={48} stroke left='10%' top='20%' />
        <SVG icon='heart' width={48} stroke left='60%' top='70%' />

        <SVG icon='triangle' width={12} left='60%' top='15%' />
      </UpDown>
      <UpDown type='wide'>
        <SVG icon='heart' width={24} stroke left='65%' top='8%' />

        <SVG icon='heart' width={12} stroke left='90%' top='50%' />

        <SVG icon='heart' width={16} stroke left='30%' top='65%' />
      </UpDown>
      <UpDown type='slow'>
        <SVG icon='triangle' width={20} hiddenMobile left='85%' top='25%' />
        <SVG icon='triangle' width={24} left='5%' top='70%' />
        <SVG icon='triangle' width={24} left='4%' top='20%' />
        <SVG icon='triangle' width={36} left='50%' top='60%' color='gray.100' />
      </UpDown>
      <Box bg={useColorModeValue(`rgba(255, 255, 255, 0.8)`, `rgba(26, 33, 42, 0.8)`)}>
        {children}
      </Box>
      <Footer />
    </>
  );
}

export default AppLayout;