import React from 'react';
import Button from '@/components/Button/Button';

export default function App(): JSX.Element {
  return (
    <React.StrictMode>
      <div className="flex justify-center items-center bg-gray-100 h-screen">
        <p className="text-lg text-center font-semibold mr-4">
          Hello World Design System Template!          
        </p>
        <Button variant="outlined" size="small" >Hi!</Button>
      </div>
    </React.StrictMode>
  );
}
