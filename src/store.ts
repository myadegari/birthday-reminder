import { create } from "zustand";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { DateObject } from "react-multi-date-picker";
import { persist } from "zustand/middleware";

export interface Person {
    id:string
    name: string
    birthday: string
    daysToBirthday?: number
}

interface storeState {
    persons: Person[]
    addPerson: (person: Person) => void
    removePerson: (person: Person) => void
    updatePerson: (person: Person) => void
    calculateBirthdays: (persons: Person[]) => Person[]
}


export const useStore = create<storeState>()(
    persist(
    (set) => ({
        persons: [],
        addPerson: (person) => set((state) => ({ persons: [...state.persons, person] })),
        removePerson: (person) => set((state) => ({ persons: state.persons.filter((p) => p.id !== person.id) })),
        updatePerson: (person) => set((state) => ({ persons: state.persons.map((p) => p.id === person.id ? person : p) })),
        calculateBirthdays: (persons: Person[]) =>{
            const today = new DateObject({
                date: new Date(),
                calendar: persian,
                locale: persian_fa,
            })
            const birthdays = persons.map((p) => {
                const [,m,d]=p.birthday.split("/")
                const birthday = new DateObject({
                    date: today.year + '/'+ m + '/' + d,
                    calendar: persian,
                    locale: persian_fa,
                })
                const time_difference = today.toDate().getTime() - birthday.toDate().getTime();
                const days = Math.round(time_difference / (1000 * 60 * 60 * 24));
                const daysToBirthday = days > 0 ? 365 - days : days * -1;
                return {
                   ...p,
                    daysToBirthday:daysToBirthday ,
                }
            })
            return birthdays
        }
    }),{
        name: 'persons',
     
   
    })
)