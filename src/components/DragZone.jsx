import React from 'react'

function DragZone({setOriginalFile,originalFile,compressedFile}) {

 const handleDragOver = (e)=>{
     e.preventDefault()
     e.dataTransfer.dropEffect = "copy"
}
 const handleDrop = (e)=>{
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if(file && file.type.startsWith("image/")) setOriginalFile(file)
 }

  return (
     <div 
     className={`flex items-start ${!originalFile ? "h-32 w-3/4 mt-2 ml-10 rounded-lg bg-transparent border-dashed border-2 border-gray-200 hover:border-dotted ": " h-32 w-32 mt-2 ml-10"}`}
     onDragOver={handleDragOver}
     onDrop={handleDrop}
     >
      {!originalFile && (
      <>
      <p className='text-xl font-medium pl-7 py-8'>drag and drop here</p>
      </>)}

      {originalFile && (<>
    {/*for future changes: <p>{originalFile.name}</p> */}
    <img 
        src={URL.createObjectURL(originalFile)} 
        alt="" 
        className="w-full h-full object-cover"
        />
    </>)}
    {compressedFile && (<>
    {/* for fututre changes: <p>{compressInfo.originalSize}MB</p> to <p>{compressInfo.compressSize}MB</p> */}
    <img 
     src={URL.createObjectURL(compressedFile)}
     alt=""
     className="w-full h-full object-cover ml-20"
     />
    </>)}
     </div> 
  )
}

export default DragZone
