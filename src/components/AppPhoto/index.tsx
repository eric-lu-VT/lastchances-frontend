import React, { useState } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import './styles.scss';

interface AppPhotoProps {
  url: string,
  children: React.ReactNode;
}

const AppPhoto = ({ url, children }: AppPhotoProps) => {
  return (
    <div className="app-photo">
      <img className='img' src={url} alt='default' />
      {<>{children}</>}
    </div>
  );
}

export default AppPhoto;