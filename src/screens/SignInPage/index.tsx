import React from 'react';
import { 
  Box, 
  Button,
  Grid, 
  Image,
  VStack 
} from '@chakra-ui/react';
import { SERVER_URL } from '../../utils/constants';

function SignInPage() {
  return (
    <>
      <Box textAlign='center' fontSize='xl'>
        <Grid 
          minH='100vh' 
          p={3}
          alignContent={'center'} 
          justifyContent={'center'}
        >
          <VStack spacing={8}>
            <Image
              borderRadius='full'
              width='70%'
              height='70%'
              src={require('../../assets/last_chances.jpg')}
            />
            <Button
              size='lg'
              onClick={() => window.open(`${SERVER_URL}auth/cas-signin`, '_self')}
              backgroundColor='#00693e'
              color='white'
            >
              Enter
            </Button>
          </VStack>
        </Grid>
      </Box>
    </>
  );
}

export default SignInPage;