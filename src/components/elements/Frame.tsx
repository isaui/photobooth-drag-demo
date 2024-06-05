'use client'
import { useEffect, useRef, useState } from "react"
import Draggable from "./Draggable"
import Stack from "./Stack"

type PhotoFrameProps = {
    className: string,
    imageUrl: string
}
const Frame: React.FC<PhotoFrameProps> = ({className, imageUrl})=> {

        const ref = useRef<HTMLDivElement>(null)
        const [isDragging, setIsDragging] = useState<boolean>(false)
        const [parentHeight, setParentHeight] = useState<number>(0)

        useEffect(()=>{
            if(ref.current != null){
                setParentHeight(ref.current.getBoundingClientRect().height)
            }
        },[ref.current])
        

        return <div ref={ref}>
            <Stack 
         className={`bg-gray-300 ${className} ${!isDragging? 'overflow-y-clip': ''}`}> 
            <Draggable
            parentHeight={parentHeight}
            onChangeDragState={(drag: boolean)=>{
                setIsDragging(drag)
            }}
             className="w-full h-fit min-h-full flex ">
            <img src={imageUrl} 
            className={`w-full ${!isDragging ? '' : 'opacity-60'} h-auto min-h-full pointer-events-none`}></img>
            </Draggable>

            <button className="text-white hide bg-black px-4 py-2 rounded-lg text-center text-xs w-fit h-fit ml-auto mt-2 mr-2">Hover/Drag to Edit</button>
        </Stack>
        </div>
}

export default Frame