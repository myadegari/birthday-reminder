import React from "react";
import { useStore } from "./store";
import { v4 as UUID } from "uuid";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { DateObject } from "react-multi-date-picker";
import { LiaUserMinusSolid,LiaUserPlusSolid,LiaDownloadSolid } from "react-icons/lia";
import { content } from "./faContent";
import JWT from 'expo-jwt';
import { toast } from "react-toastify";

function PeopleManagement() {

  document.title= `${content.title} - ${content.addPersonToBirthdays}`
  const [formData, setFormData] = React.useState({
    name: '',
    birthday: ''
  })


  const addPerson = useStore(state => state.addPerson)
  const persons = useStore(state => state.persons)
  const removePerson = useStore(state => state.removePerson)


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

  
      switch (formData.birthday.split('/').length) {
        case 3:
          if (persons.find((person) => person.name === formData.name && person.birthday === formData.birthday)){
            toast.warning(<p style={{direction:"rtl"}}>{content.duplicateError}</p>)
          }
        else{

          addPerson({ ...formData, id: UUID() })
          setFormData({
            name: '',
            birthday: ''
          })
        }
          break;
        case 2:
          if (persons.find((person) => person.name === formData.name && person.birthday === sampleYear + '/'+formData.birthday)){
            toast.warning(<p style={{direction:"rtl"}}>{content.duplicateError}</p>)
          }
          else{
            addPerson({ ...formData, id: UUID(), birthday: sampleYear + '/' + formData.birthday })
            setFormData({
              name: '',
              birthday: ''
            })
          }
          break;
        default:
          break;
      }


  }
  const handleDownload = () => {
    if (persons.length === 0) {
      toast.error(<p style={{direction:"rtl"}}>{content.noDataError}</p>)
      return;
    }
    const jwt = JWT.encode(persons, 'secret');
    const json = JSON.stringify({data:jwt});
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
  };
  const sampleYear = new DateObject({
    date: new Date(),
    calendar: persian,
    locale: persian_fa
  }).format().split('/')[0]

  return (
    <>
        <form onSubmit={handleSubmit} className="grid gap-5 p-2 md:mb-0 mb-3">
          <fieldset className="bg-slate-50 rounded-md p-4 drop-shadow-md">
            <legend className="bg-slate-50 px-4 py-2 rounded-lg">{content.name}</legend>
            <input value={formData.name} type='text' name="name"
              className="bg-slate-100 rounded-md p-2 border-2 outline-none focus:border-blue-300"
              onChange={handleChange} />
          </fieldset>
          <fieldset className="bg-slate-50 rounded-md p-4 drop-shadow-md">
            <legend className="bg-slate-50 px-4 py-2 rounded-lg">{content.birthday}</legend>
            <input value={formData.birthday} type='text' placeholder={new DateObject({date: new Date(), calendar: persian, locale: persian_fa}).subtract(25,'years').format()} name="birthday"
              className="bg-slate-100 rounded-md p-2 border-2 outline-none focus:border-blue-300"
              onChange={handleChange} />
          </fieldset>
          <div className="flex gap-5 mt-2 pr-2"
            style={{ fontSize: '1.5rem' }}
          >
            <button 
            className="hover:text-blue-600 transition-colors duration-200"
            type='submit'>
              <LiaUserPlusSolid />
              </button>
            <button 
            className="hover:text-green-600 transition-colors duration-200"
            onClick={handleDownload}
            >
              <LiaDownloadSolid />
              </button>

          </div>
        </form>


      <div className='flex flex-col divide-y-2 border-dashed px-5 pt-5 border-blue-200 border-t-2 md:border-r-2 md:pr-8 md:border-t-0 md:pt-2 md:px-0'>
      {persons.length > 0 ?(
 
          persons.map(person => (
            <div key={person.id} className="flex items-center justify-between gap-5 px-5 py-2 hover:shadow-md hover:bg-slate-50 hover:rounded-md hover:border-transparent cursor-default transition-colors duration-200">
              <div className="pl-5">
                <p >{person.name}</p>
                <p>{new DateObject({
                  date: person.birthday,
                  calendar: persian,
                  locale: persian_fa
                }).format("D MMMM")}</p>
              </div>
              <span
                className="flex gap-2"
                >
                <LiaUserMinusSolid 
                className="cursor-pointer hover:text-red-600 transition-colors duration-200"
                onClick={() => removePerson(person)}
                style={{ fontSize: "1.5rem" }} />
              </span>
              </div>)))
        :(
          <div className="flex flex-col items-center justify-center">
            <p className="">{content.noDataforShow.title}</p>
          </div>
        )
      }
      </div>
    </>
  )
}

export default PeopleManagement
