import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box, 
  Center, 
  chakra,
  Grid,
  Heading,
  Link,
  ListItem,
  OrderedList,
  UnorderedList,
  useColorModeValue,
  VStack 
} from '@chakra-ui/react';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { logout } from '../../redux/slices/authSlice';
import { ModalSelect } from '../../components/ModalSelect';
import { IFollowing, getFollowings, getMatches } from '../../redux/slices/followingsSlice';
import '../../utils/global.css';

function FrontPage() {
  const dispatch = useAppDispatch();
  const { name, id } = useAppSelector((state) => state.auth)
  const { crushes, matches } = useAppSelector((state) => state.following)

  useEffect(() => {
    dispatch(getFollowings({ userId: id }));
  }, []);

  useEffect(() => {
    dispatch(getMatches({ userId: id }));
  }, []);

  // TODO: STAY THIRSTY DARTMOUTH

  return (
    <Box 
      textAlign='center' 
      fontSize='xl'
      minH='100vh'
    >
      <Grid minH='100vh' p={3}>
        <VStack spacing={8}>
          <Heading
            bgGradient={`linear(to-r, ${useColorModeValue(
              `pink.600`,
              `pink.400`
            )}, ${useColorModeValue(`#00693e`, `#00693e`)}, ${useColorModeValue(
              `pink.600`,
              `pink.400`
            )})`}
            className='moving-grad'
            bgClip='text'
            fontSize={{ base: `5xl`, lg: `7xl` }}
            textAlign={{ base: `center`, lg: `left` }}
          >
            LAST CHANCES
          </Heading>
          <chakra.p
            bgGradient={`linear(to-r, ${useColorModeValue(
              `pink.600`,
              `pink.400`
            )}, ${useColorModeValue(`#00693e`, `#00693e`)}, ${useColorModeValue(
              `pink.600`,
              `pink.400`
            )})`}
            className='moving-grad'
            bgClip='text'
            fontSize={{ base: `3xl`, lg: `5xl` }}
            textAlign={{ base: `center`, lg: `left` }}
          >
            STAY THIRSTY DARTMOUTH
          </chakra.p>
          <chakra.p>
            LOGGED IN AS {name.toUpperCase()}.{' '}
            <Link
              onClick={(e) => dispatch(logout({}))}
              color='#00693e'
            >
              LOGOUT.
            </Link>
          </chakra.p>
          <chakra.p
            maxW='650px'
            textAlign={{ base: `center`, lg: `left` }}
            fontSize='xl'
            mt={2}
          >
            Your picks are kept private unless you are matched.
            Matches are done by a computer program.
            Concerns? Questions?{' '}
            <Link
              href='mailto:lastchances22f@gmail.com'
              color='#00693e'
            >
              lastchances22f@gmail.com
            </Link>
          </chakra.p>
          <Accordion 
            allowMultiple
            width='60%'
          >
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    ADD NEW CRUSHES
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <chakra.p
                  fontSize='xl'
                  mt={2}
                >
                  HOW TO USE:
                </chakra.p>
                <Center>
                  <UnorderedList
                    textAlign='left'
                  >
                    <ListItem>
                      Search by name (first, middle, last) in the boxes below.
                    </ListItem>
                    <ListItem>
                      Click on the suggested name you desire.
                    </ListItem>
                    <ListItem>
                      Press submit to add your crush!
                    </ListItem>
                  </UnorderedList>
                </Center>
                <chakra.p
                  fontSize='xl'
                  mt={2}
                >
                  Crush entries cannot be deleted, and you can only choose up to 10. Choose carefully!
                </chakra.p>
                <chakra.p
                  fontSize='xl'
                  mt={2}
                >
                  You have {10 - Object.keys(crushes).length} crushes remaining.
                </chakra.p>
                <ModalSelect />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    VIEW YOUR CRUSHES
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {
                  crushes.length > 0 ?
                    <Center>
                      <OrderedList
                        textAlign='left'
                      >
                        {
                          crushes.map((value: IFollowing, i) => {
                            return (
                              <ListItem
                                key={i}
                              >
                                { value.followedName }
                              </ListItem>
                            )
                          })
                        }
                      </OrderedList>
                    </Center>
                  :
                    <chakra.p
                      fontSize='xl'
                      mt={2}
                    >
                      You haven't submitted any crushes :(
                    </chakra.p>
                }
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    VIEW YOUR MATCHES
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {
                  matches.length > 0 ?
                    <Center>
                      <OrderedList
                        textAlign='left'
                      >
                        {
                          matches.map((value: IFollowing, i) => {
                            return (
                              <ListItem
                                key={i}
                              >
                                { value.followedName }
                              </ListItem>
                            )
                          })
                        }
                      </OrderedList>
                    </Center>
                  :
                    <chakra.p
                      fontSize='xl'
                      mt={2}
                    >
                      You have no matches :(
                    </chakra.p>
                }
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
      </Grid>
    </Box>
  );
}

export default FrontPage;
