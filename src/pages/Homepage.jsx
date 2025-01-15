import React, { useState } from 'react'
import imageCompression from 'browser-image-compression';
import DragZone from '../components/DragZone'

function Homepage() {
    const [originalFile , setOriginalFile] = useState(null)
    const [compressedFile , setCompressedFile] = useState(null)
    const [compressInfo , setCompressInfo] = useState(null)

    const [height , setHeight] = useState("")
    const [width , setWidth] = useState("")



    const upload=(e)=>{
      const file = e.target.files[0]
      if(file) setOriginalFile(file)
    }
   
    const HandleCompressImage = async() =>{
      if(!originalFile){
         alert("enter an image")
         return;
        }
      

      const option = {
        maxSizeMB: 1,
        maxWidthOrHeight: Math.max(height || 1920 , width || 1920),
        useWebWorker: true
      }
      


      try {
        const compressed = await imageCompression(originalFile , option);
        setCompressedFile(compressed)
        const originalSize = (originalFile.size / 1024 / 1024).toFixed(2)
        const compressSize = (compressed.size / 1024 / 1024).toFixed(2)
        console.log("run")
        setCompressInfo({originalSize,compressSize})



      } catch (error) {
        console.log(error)
      }

    }

    const handleDownload = () =>{
      const link = document.createElement("a")
      link.href = URL.createObjectURL(compressedFile)
      link.download = "new.jpeg"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
       
    }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 '>
      <div className='h-80 w-96 bg-blue-500 bg-opacity-65 text-white shadow-2xl shadow-blue-600 rounded-lg border-none'>

        <h1 className='text-2xl ml-10 pt-2'>IMAGE COMPRESSION TOOL</h1>
            <div className='mt-2 ml-8 flex items-center'>
                <p className='text-xl font-medium pl-10'> drop a file : </p>
                <input type="file" accept='image/*' onChange={upload} className='hidden' id='upload-file'/>
                <label htmlFor="upload-file" className='h-8 text-white bg-[#5393e1] hover:bg-[#3b76bf]/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center cursor-pointer ml-3'>upload</label>
                  </div>
   
      {/* drag and drop field */}
      <DragZone
      setOriginalFile={setOriginalFile}
      originalFile={originalFile}
      compressedFile={compressedFile}
      />
   
    {/* compression section */}
      <div className='mt-2'>
        <label className='pl-9'>height:</label>
      <input 
        type="number"
        value={height}
        onChange={(e)=> setHeight(e.target.value)}
        placeholder='1080'
        min={0}
        max={1920}
        className='h-5 appearance-none outline-none text-black rounded-sm'
        />
        <label className='pl-9'>width:</label>
        <input 
        type="number"
        value={width}
        onChange={(e)=> setWidth(e.target.value)}
        placeholder='720'
        min={0}
        max={1920}
        className='h-5 appearance-none outline-none text-black rounded-sm'
        />
      </div>
  
    
      

      <button className='ml-12 mt-4  text-white bg-[#5393e1] hover:bg-[#3b76bf]/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center cursor-pointer' onClick={HandleCompressImage}>compress image</button>
      {/* download section */}
      {compressedFile && 
      <button 
      className='ml-4  text-white bg-[#5393e1] hover:bg-[#3b76bf]/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center cursor-pointer' 
      onClick={handleDownload}
      >downlaod
      </button>}
     
      
      </div>
   
    </div>
  )
}

export default Homepage
