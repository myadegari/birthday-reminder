import React from 'react'
import { Outlet,NavLink } from 'react-router-dom'
import { content } from "./faContent";
import classNames from 'classnames';

export default function Layout() {
  return (
    <div>
        <span className="flex gap-[2px]">
        <NavLink 
        className={(status)=>
            classNames('py-2 px-4 rounded-lg rounded-b-none',
            {'bg-slate-100':status.isActive,
            'bg-slate-300':!status.isActive})
        }
        to="/">
            {content.showBirthdays}</NavLink>
        <NavLink 
         className={(status)=>
        classNames('py-2 px-4 rounded-lg rounded-b-none',
        {'bg-slate-100':status.isActive,
         'bg-slate-300':!status.isActive})
    }
        to="/persons">{content.addPersonToBirthdays}</NavLink>
        </span>
    <div className='grid place-items-center bg-slate-100 rounded-lg rounded-tr-none p-5 md:gap-8 md:grid-cols-2  '>
        <Outlet/>
  </div>

    </div>
  )
}