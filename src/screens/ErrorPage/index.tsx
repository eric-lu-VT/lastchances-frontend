import {
  Box, 
  Grid,
  Text,
} from '@chakra-ui/react';

function ErrorPage() {
  return (
    <Box textAlign='center' fontSize='xl'>
      <Grid minH='100vh' p={3}>
        <Text>Loading...</Text>
      </Grid>
    </Box>
  );
}

export default ErrorPage;