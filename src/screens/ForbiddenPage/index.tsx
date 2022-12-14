import {
  Box, 
  Grid,
  Text,
} from '@chakra-ui/react';

function ForbiddenPage() {
  return (
    <Box textAlign='center' fontSize='xl'>
      <Grid minH='100vh' p={3}>
        <Text>403 - Forbidden</Text>
        <Text>You do not have permissions to view this page.</Text>
      </Grid>
    </Box>
  );
}

export default ForbiddenPage;