import React, { useEffect, useRef, useState, RefObject } from 'react';
import {
  Box,
  Button,
  HStack,
  Input,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  Text,
} from '@chakra-ui/react';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { DartQuery, getDartUsers } from '../../redux/slices/dartSlice';
import { createFollowing } from '../../redux/slices/followingsSlice';
import './styles.scss';

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

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event: MouseEvent) => {
    const { current: wrap } = ref;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  return (
    <Box ref={ref}>
      <Box>
        <HStack spacing='12px'>
          <Input
            placeholder="Enter first name"
            onClick={() => setDisplay(!display)}
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
              dispatch(getDartUsers({ first_name: event.target.value, middle_name: middleName, last_name: lastName }));
            }}
          />
          <Input
            placeholder="Enter middle name"
            onClick={() => setDisplay(!display)}
            value={middleName}
            onChange={(event) => {
              setMiddleName(event.target.value);
              dispatch(getDartUsers({ first_name: event.target.value, middle_name: middleName, last_name: lastName }));
            }}
          />
          <Input
            placeholder="Enter last name"
            onClick={() => setDisplay(!display)}
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
              dispatch(getDartUsers({ first_name: event.target.value, middle_name: middleName, last_name: lastName }));
            }}
          />
        </HStack>
      </Box>
      {
        display &&
          <Box>
            {
              loading ?
                <Text fontSize='1xl'>
                  Loading...
                </Text>
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
                              className="dropdown-item"
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
              onClick={(e) => dispatch(createFollowing({ followedName: selectedUser.name, followedNetId: selectedUser.netid, followerNetId: netid, followerUserId: id }))}
            >
              Submit
            </Button>
          </Box>
      }
    </Box>
  );
}
