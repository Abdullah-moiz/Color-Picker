import React, { useEffect, useState } from 'react'
import useEyeDropper from 'use-eye-dropper'



export default function Main() {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const { open} = useEyeDropper()
    const [color, setColor] = useState('')
    const [error, setError] = useState()

  
   
    const pickColor = () => {
        open()
          .then(color => setColor(color.sRGBHex))
          .catch(e => {
            console.log(e)
            if (!e.canceled) setError(e)
          })
        }


        
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl) 
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }

   



    

    return (
        <div className='w-full h-screen bg-slate-800 text-white'>
            <div>
                <h1 className='w-full h-40 text-4xl flex  items-center justify-center'>Color <span className='text-orange-600'>Picker</span></h1>
            </div>
            <div className='w-full flex flex-col items-center justify-center p-4'>
                <input className='p-2 m-4' type='file' onChange={onSelectFile} />
                {selectedFile && 
                <img src={preview} alt="No img to preview"  className='w-96 h-52 p-1 m-4'   /> 
            }
          <button onClick={pickColor} className="flex items-center justify-center text-xl font-bold border-2 border-orange-600 p-2 m-2 rounded hover:bg-orange-600 hover:color-slate-800 transition-all duration-300">Pick color</button>
                <p className='flex m-2 p-2'>Color Code  <span className='text-orange-600 pl-4'>{color}</span></p>
                <div style={{background:`${color}` }} className="h-16 border-2 border-white flex items-center justify-center text-white text-xl font-bold rounded w-32">{color}</div>
            </div>
        </div>
    )
}
