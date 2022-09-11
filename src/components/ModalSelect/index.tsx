import React, { useEffect, useRef, useState, RefObject } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { DartQuery, getDartUsers } from '../../redux/slices/dartSlice';
import { createFollowing } from '../../redux/slices/followingsSlice';
import './styles.scss';

export function ModalSelect() {
  const { id } = useAppSelector((state) => state.auth); 
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
    <div ref={ref} className="modal-select">
      <div className="input-row">
        <input
          className="input"
          onClick={() => setDisplay(!display)}
          placeholder="Enter first name"
          value={firstName}
          onChange={(event) => {
            setFirstName(event.target.value);
            dispatch(getDartUsers({ first_name: event.target.value, middle_name: middleName, last_name: lastName }));
          }}
        />
        <input
          className="input"
          onClick={() => setDisplay(!display)}
          placeholder="Enter middle name"
          value={middleName}
          onChange={(event) => {
            setMiddleName(event.target.value);
            dispatch(getDartUsers({ first_name: firstName, middle_name: event.target.value, last_name: lastName }));
          }}
        />
        <input
          className="input"
          onClick={() => setDisplay(!display)}
          placeholder="Enter last name"
          value={lastName}
          onChange={(event) => {
            setLastName(event.target.value);
            dispatch(getDartUsers({ first_name: firstName, middle_name: middleName, last_name: event.target.value }));
          }}
        />
      </div>
      {display && 
        <div className="dropdown-container">
          {loading ?
            <p>Loading...</p>
            : <>
              {search
                .map((value: DartQuery, i) => {
                  return (
                    <div
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
                      {value.name}
                    </div>
                  )
                })
              }
            </>
          }
        </div>
      }
      <div className='submit-row'>
        <button
          className='button'
          onClick={(e) => dispatch(createFollowing({ followedName: selectedUser.name, followedEmail: selectedUser.email, followerId: id }))}
        >
          Submit
        </button>
      </div>
    </div>
  );
}