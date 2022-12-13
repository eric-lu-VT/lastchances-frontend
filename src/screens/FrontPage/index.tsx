import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box, 
  Button, 
  Grid,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  VStack 
} from '@chakra-ui/react';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { logout } from '../../redux/slices/authSlice';
import { ModalSelect } from '../../components/ModalSelect';
import { IFollowing, getFollowings, getMatches } from '../../redux/slices/followingsSlice';
import { AiFillCaretRight, AiFillCaretDown } from 'react-icons/ai';

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

  return (
    <Box textAlign='center' fontSize='xl'>
      <Grid minH='100vh' p={3}>
        <VStack spacing={8}>
          <Text fontSize='3xl'>
            LAST CHANCES - STAY THIRSTY DARTMOUTH
          </Text>
          <Text fontSize='3xl'>
            LOGGED IN AS {name.toUpperCase()}
          </Text>
          <Button
            size='md'
            onClick={(e) => dispatch(logout({}))}
          >
            Log Out
          </Button>
          <Text fontSize='2xl'>
            Your picks are kept private unless you are matched.
            Matches are done by a computer program.
            Concerns? Questions? lastchances22f@gmail.com
          </Text>
          <Accordion 
            allowToggle
            width='60%'
          >
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    ADD NEW CRUSHES
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text fontSize='1xl'>
                  HOW TO USE:
                </Text>
                <UnorderedList>
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
                <Text fontSize='1xl'>
                  Crush entries cannot be deleted, and you can only choose up to 10. Choose carefully!
                </Text>
                <Text fontSize='1xl'>
                  You have {10 - Object.keys(crushes).length} crushes remaining.
                </Text>
                <ModalSelect />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    VIEW YOUR CRUSHES
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {
                  crushes.length > 0 ?
                    <OrderedList>
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
                  :
                    <Text fontSize='1xl'>
                      You haven't submitted any crushes :(
                    </Text>
                }
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    VIEW YOUR MATCHES
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {
                  crushes.length > 0 ?
                    <OrderedList>
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
                  :
                    <Text fontSize='1xl'>
                      You have no matches :(
                    </Text>
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
