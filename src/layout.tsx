import { Outlet } from 'react-router-dom'
import { content } from "./faContent";
import classNames from 'classnames';
import { useLocation,useNavigate } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const status = {
    index: location.pathname === '/birthday-reminder/',
    persons:location.pathname == '/birthday-reminder/persons'
  };
  return (
    <div>
        <span className="flex gap-[2px]">
        <p
         className={ classNames('py-2 px-4 rounded-lg rounded-b-none cursor-pointer',
        {'bg-slate-100':status.index,
         'bg-slate-300':!status.index})}
         onClick={()=>{
         navigate('/birthday-reminder/')
        }}
        >
            {content.showBirthdays}</p>
            <p
         className={ classNames('py-2 px-4 rounded-lg rounded-b-none cursor-pointer',
        {'bg-slate-100':status.persons,
         'bg-slate-300':!status.persons})}
         onClick={()=>{
         navigate('/birthday-reminder/persons')
        }}
        >{content.addPersonToBirthdays}</p>
        </span>
    <div className='md:w-[700px] w-[100dvw] grid place-items-center bg-slate-100 rounded-lg rounded-tr-none p-5 sm:grid-cols-2'>
        <Outlet/>
  </div>

    </div>
  )
}