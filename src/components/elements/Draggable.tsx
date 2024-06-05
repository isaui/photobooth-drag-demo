"use client"
import React, { ReactNode, useRef, useState, useEffect } from 'react';
import Stack from './Stack';

interface DraggableProps {
  children: ReactNode;
  defaultY?: number;
  className?: string;
  onChangeDragState:(isDragging: boolean)=> void;
  parentHeight: number
}

const Draggable: React.FC<DraggableProps> = ({ children, defaultY = 0, className = '', onChangeDragState, parentHeight }) => {
  const [top, setTop] = useState<number>(defaultY);
  const draggableRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const offsetYRef = useRef<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (draggableRef.current) {
      setIsDragging(true);
      offsetYRef.current = top  + 
      draggableRef.current.getBoundingClientRect().bottom - draggableRef.current.getBoundingClientRect().top;
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && draggableRef.current && offsetYRef.current !== null) {
      const newTop = e.clientY - offsetYRef.current;
      const maximumTop = (-1 * (draggableRef.current.getBoundingClientRect().height - parentHeight))
      setTop(newTop < maximumTop? maximumTop : newTop < 0 ? newTop : 0);
      console.log("PARENT HEIGHT: "+parentHeight)
      console.log(newTop)
      console.log("PANJANG NYA-> "+`${draggableRef.current.getBoundingClientRect().bottom - draggableRef.current.getBoundingClientRect().top}`)
      onChangeDragState(true) 
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    offsetYRef.current = null;
    onChangeDragState(false)
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={draggableRef}
      className={`relative ${className}`}
      style={{ top: top, cursor: isDragging ? 'grabbing' : 'grab' }}
      onMouseDown={handleMouseDown}
    >
      {children}

    </div>
  );
};

export default Draggable;



