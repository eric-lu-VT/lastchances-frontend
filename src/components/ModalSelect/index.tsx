import React, { useEffect, useRef, useState, RefObject } from 'react';
import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  chakra,
  CloseButton,
  HStack,
  Input,
  Flex,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { DartQuery, getDartUsers } from '../../redux/slices/dartSlice';
import { createFollowing } from '../../redux/slices/followingsSlice';

export function ModalSelect() {
  const { id, netid } = useAppSelector((state) => state.auth); 
  const { loading, search } = useAppSelector((state) => state.dart);
  const dispatch = useAppDispatch();
  
  const [display, setDisplay] = useState<boolean>(false);
  const ref: RefObject<any> = useRef(null);
  
  const [firstName, setFirstName] = useState<string>('');
  const [middleName, setMiddleName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const [selectedUser, setSelectedUser] = useState<DartQuery>({
    name: '',
    last_name: '',
    cache_date: '',
    suffix: '',
    first_name: '',
    netid: '',
    email: '',
    prefix: '',
    middle_name: '',
    campus_address: '',
  });

  const { 
    isOpen: isSubmitModalOpen,
    onOpen: onSubmitModalOpen,
    onClose: onSubmitModalClose,
  } = useDisclosure({ defaultIsOpen: false });
  const cancelRef = React.useRef();

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure({ defaultIsOpen: false });
  const [isAlertSuccess, setIsAlertSuccess] = useState<boolean>(true);

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleClickOutside = (event: MouseEvent) => {
    const { current: wrap } = ref;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const backgroundColor = useColorModeValue('green.400', 'green.600');

  return (
    <Box ref={ref}>
      {
        isAlertOpen && 
          <Alert 
            status={isAlertSuccess ? 'success' : 'error'}
            style={{
              position: 'absolute',
              top: '0'
            }}
            maxW='56%'
          >
            <Flex
              minWidth='100%'
              alignItems='center' 
              justifyContent='center'
              gap='2'
            >
              <AlertIcon />
              {
                isAlertSuccess && 
                  <AlertTitle>
                    Success!
                  </AlertTitle>
              }
              <AlertDescription>
                {
                  isAlertSuccess ?
                    'Crush uploaded to the server.'
                  :
                    'There was an error processing your request'
                }
              </AlertDescription>
              <CloseButton
                alignSelf='flex-start'
                position='relative'
                right={-1}
                top={-1}
                onClick={onAlertClose}
              />
            </Flex>
          </Alert>
      }
      <Box>
        <HStack spacing='12px'>
          <Input
            placeholder='Enter first name'
            onClick={() => setDisplay(!display)}
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
              dispatch(getDartUsers({ first_name: event.target.value, middle_name: middleName, last_name: lastName }));
            }}
          />
          <Input
            placeholder='Enter middle name'
            onClick={() => setDisplay(!display)}
            value={middleName}
            onChange={(event) => {
              setMiddleName(event.target.value);
              dispatch(getDartUsers({ first_name: firstName, middle_name: event.target.value, last_name: lastName }));
            }}
          />
          <Input
            placeholder='Enter last name'
            onClick={() => setDisplay(!display)}
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
              dispatch(getDartUsers({ first_name: firstName, middle_name: middleName, last_name: event.target.value }));
            }}
          />
        </HStack>
      </Box>
      {
        display &&
          <Box>
            {
              loading ?
                <chakra.p
                  maxW='650px'
                  textAlign={{ base: `center`, lg: `left` }}
                  fontSize='xl'
                  mt={2}
                >
                  Loading...
                </chakra.p>
              :
                <TableContainer>
                  <Table size='md'>
                    <Tbody>
                      {search
                        .map((value: DartQuery, i) => {
                          return (
                            <Tr
                              key={i}
                              onClick={() => {
                                setFirstName(value.first_name);
                                setMiddleName(value.middle_name);
                                setLastName(value.last_name);
                                setSelectedUser({
                                  name: value.name,
                                  last_name: value.last_name,
                                  cache_date: value.cache_date,
                                  suffix: value.suffix,
                                  first_name: value.first_name,
                                  netid: value.netid,
                                  email: value.email,
                                  prefix: value.prefix,
                                  middle_name: value.middle_name,
                                  campus_address: value.campus_address,
                                });
                                dispatch(getDartUsers({ first_name: value.first_name, middle_name: value.middle_name, last_name: value.last_name }));
                              }}
                              _hover={{ bg: backgroundColor }}
                              _focus={{ boxShadow: 'outline' }}
                              cursor={'pointer'}
                            >
                              <Td>
                                {value.name}
                              </Td>
                            </Tr>
                          )
                        })
                      }
                    </Tbody>
                  </Table>
                </TableContainer>
            }
            <Button
              size='md'
              onClick={onSubmitModalOpen}
              backgroundColor='#00693e'
              color='white'
            >
              Submit
            </Button>
          </Box>
      }
      <AlertDialog
        isOpen={isSubmitModalOpen}
        leastDestructiveRef={cancelRef}
        onClose={onSubmitModalClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Add Crush - {selectedUser.name}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onSubmitModalClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={(e) => {
                onSubmitModalClose();
                dispatch(createFollowing({ followedName: selectedUser.name, followedNetId: selectedUser.netid, followerNetId: netid, followerUserId: id }))
                  .then((res) => {
                    if (res.payload) {
                      setIsAlertSuccess(true);
                    } else {
                      setIsAlertSuccess(false);
                    }
                    onAlertOpen();
                  });
              }} ml={3}>
                Confirm Submit
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}

// onClick={(e) => dispatch(createFollowing({ followedName: selectedUser.name, followedNetId: selectedUser.netid, followerNetId: netid, followerUserId: id }))}