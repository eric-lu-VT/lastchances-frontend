import React from 'react';
import { Box, Button, Grid, VStack } from '@chakra-ui/react';
import { SERVER_URL } from '../../utils/constants';

function SignInPage() {
  return (
    <Box textAlign='center' fontSize='xl'>
      <Grid minH='100vh' p={3}>
        <VStack spacing={8}>
          <Button
            size='md'
            onClick={() => window.open(`${SERVER_URL}auth/cas-signin`, '_self')}
          >
            CAS Sign In
          </Button>
        </VStack>
      </Grid>
    </Box>
  );
}

export default SignInPage;