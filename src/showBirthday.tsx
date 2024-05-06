import React from 'react'
import { useStore,Person } from './store'
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import { TbFileIsr } from "react-icons/tb";
import { content } from './faContent';
import CryptoJS from "crypto-js"
import classNames from 'classnames';
import { toast } from 'react-toastify';


export default function ShowBirthday() {
    const dataUploaderRef = React.useRef<HTMLInputElement>(null)
    const [file, setFile] = React.useState<File | null>(null)
    const persons = useStore(state => state.persons)
    const calculateBirthdays = useStore(state => state.calculateBirthdays)
    const addPerson = useStore(state => state.addPerson)


    document.title= `${content.title}`


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0]
            const fileType = file.type;
            const fileSize = file.size;
            if (fileType !== 'application/json') {
              toast.error(<p style={{direction:"rtl"}}>{content.fileTypeError}</p>)
              return;
            }
          
            // Restrict file size to 1MB
            if (fileSize > 1024 * 1024) {
              toast.error(<p style={{direction:"rtl"}}>{content.fileSizeError}</p>)

              return;
            }
            setFile(file);
        }
        
    }

    const handleUpload = () => {
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const jsonData = JSON.parse(reader.result as string);
          try{
            const data = CryptoJS.AES.decrypt(jsonData.data,'secret').toString(CryptoJS.enc.Utf8);
            const finalData = JSON.parse(data);
            finalData.forEach((person:Person) => {
                if(!persons.find((item) => item.id === person.id)){
                addPerson(person)
                }
              })
            toast.success(<p style={{direction:"rtl"}}>{content.fileUploadSuccess}</p>)
            
           setFile(null);
          }
        catch(err){
          toast.error(<p style={{direction:"rtl"}}>{content.fileUploadError}</p>)
          }
        };
        reader.readAsText(file);
      }
      
  
       
      }

  return (
  <>
    <div className="px-2 py-5 flex flex-col gap-2">
        <div className='flex gap-5'>
        <button className={classNames("flex items-center justify-center gap-2 cursor-pointer  py-2 px-4 rounded-xl bg-blue-200 hover:bg-blue-600 hover:text-blue-50 transition-colors duration-200",{"":!persons.length})}
        onClick={()=>{
          dataUploaderRef.current?.click();
        }}
        >
          <TbFileIsr/>
            {content.choseFile}
        </button>
            <button 
               onClick={handleUpload}
            className={classNames("flex items-center justify-center gap-2 py-2 px-4 rounded-xl",{"bg-blue-200 hover:bg-blue-600 hover:text-blue-50 transition-colors duration-200 cursor-pointer ":file,
              "cursor-default bg-slate-300 text-gray-400":!file
            })}>
              <LiaCloudUploadAltSolid
                style={{ fontSize: '1.5rem' }}
           
              />
              <input ref={dataUploaderRef} 
              accept=".json"
              onChange={handleChange}
              type="file" name="dataUploader" id="dataUploader" style={{display:'none'}} />
              {content.uploadfile}
            </button>
        </div>
        
    </div>
    <div className='flex flex-col divide-y-2 border-dashed px-5 pt-5 border-blue-200 border-t-2 md:border-r-2 md:pr-8 md:border-t-0 md:pt-2 md:px-0'>
      {persons.length ? calculateBirthdays(persons).sort((a,b)=>{
          if(a.daysToBirthday && b.daysToBirthday){
            return a.daysToBirthday - b.daysToBirthday
          }
          else{
            return 0
          }
        }).map((person) => (
            <div key={person.id} className='flex items-center gap-2 p-2 justify-between'>
                <span className="text-xl font-bold">{person.name}</span>
                <span className="text-xl">{person.daysToBirthday} روز</span>
            </div>
        )):(
          <div className='w-[300px] flex flex-col items-center justify-center gap-5'>
            <p>{content.noDataforShow.title}</p>
            <p className=''>{content.noDataforShow.dis}</p>
          </div>
        )
        }
        </div>
  </>
  )
}
