import React, { useState, useEffect } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { logout } from '../../redux/slices/authSlice';
import { ModalSelect } from '../../components/ModalSelect';
import { IFollowing, getFollowings } from '../../redux/slices/followingsSlice';
import { AiFillCaretRight, AiFillCaretDown } from 'react-icons/ai';

function FrontPage() {
  const dispatch = useAppDispatch();
  const { name, id } = useAppSelector((state) => state.auth)
  const { crushes, matches } = useAppSelector((state) => state.following)

  const [isAddPageOpen, setIsAddPageOpen] = useState<boolean>(false);
  const [isViewCrushesOpen, setIsViewCrushesOpen] = useState<boolean>(false);
  const [isViewMatchesOpen, setIsViewMatchesOpen] = useState<boolean>(false);
  
  useEffect(() => {
    dispatch(getFollowings({ userId: id }));
  }, []);

  return (
    <div className='container'>
      <div className='inner-container'>
        <h1 className='green'>LAST CHANCES - <em>STAY THIRSTY DARTMOUTH</em></h1>
        <h2>
          LOGGED IN AS {name.toUpperCase()}.&nbsp;
          <button
            className='button'
            onClick={(e) => dispatch(logout({}))}
          >
            Logout
          </button>
        </h2>
        <div>
          Your picks are kept private unless you are matched.
          Matches are done by a computer program.<br></br>
          Concerns? Questions? <b>lastchances@gmail.com</b>
        </div>
        <div>
          {isAddPageOpen ?
            <>
              <h2 
                className='green link'
                onClick={(e) => setIsAddPageOpen(false)}
              >
                ADD NEW CRUSHES
                <AiFillCaretDown
                  className='icon'
                  size={20}
                />
              </h2>
              <h3>
                HOW TO USE:
              </h3>
              <text>
                <ol>
                  <li>Search by name (first, middle, last) in the boxes below.</li>
                  <li>Click on the suggested name you desire.</li>
                  <li>Press submit to add your crush!</li>
                </ol>
              </text>
              <h4>
                Crush entries cannot be deleted, and you can only choose up to 10. Choose carefully!
              </h4>
              <h4>
                You have {10 - Object.keys(crushes).length} crushes remaining.
              </h4>
              { Object.keys(crushes).length === 0 && 
                  <div className='container'>
                    <ModalSelect />
                  </div>
              }
            </>
          :
            <h2 
              className='green link'
              onClick={(e) => setIsAddPageOpen(true)}
            >
              ADD NEW CRUSHES
              <AiFillCaretRight
                className='icon'
                size={20}
              />
            </h2>
          }
          {isViewCrushesOpen ?
            <>
              <h2 
                className='green link'
                onClick={(e) => setIsViewCrushesOpen(false)}
              >
                VIEW YOUR CRUSHES
                <AiFillCaretDown
                  className='icon'
                  size={20}
                />
              </h2>
              {
                crushes.length !== 0 ?
                <ol>
                  { 
                    crushes.map((value: IFollowing, i) => {
                      return (
                        <li
                          key={i}
                        >
                          { value.followedName }
                        </li>
                      )
                    })
                  }
                </ol>
                :
                  <div>You haven't submitted any crushes :(</div>
              }
            </>
          :
            <h2 
              className='green link'
              onClick={(e) => setIsViewCrushesOpen(true)}
            >
              VIEW YOUR CRUSHES
              <AiFillCaretRight
                className='icon'
                size={20}
              />
            </h2>
          }
          {isViewMatchesOpen ?
            <>
              <h2 
                className='green link'
                onClick={(e) => setIsViewMatchesOpen(false)}
              >
                VIEW YOUR MATCHES
                <AiFillCaretDown
                  className='icon'
                  size={20}
                />
              </h2>
              { matches.length !== 0 ?
                <ol>
                  { 
                    matches.map((value: IFollowing, i) => {
                      return (
                        <li
                          key={i}
                        >
                          { value.followedName }
                        </li>
                      )
                    })
                  }
                </ol>
              :
                <div>You have no matches :(</div>
              }
            </>
          :
            <h2 
              className='green link'
              onClick={(e) => setIsViewMatchesOpen(true)}
            >
              VIEW YOUR MATCHES
              <AiFillCaretRight
                className='icon'
                size={20}
              />
            </h2>
          }
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
