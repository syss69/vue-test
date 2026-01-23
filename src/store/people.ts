import { defineStore } from "pinia";

export interface Person {
  id: number
  name: string
  ageInHours: number
}

const hrsInMonth = 720;

const hrsInYear = 8760;

export const usePeopleStore = defineStore('people', {
    state: () => ({
        people: [
            { id: 1, name: 'Alice', ageInHours: 262800 },
            { id: 2, name: 'Bob', ageInHours: 350400 },
            { id: 3, name: 'Charlie', ageInHours: 219000 },
        ],
        minimumAgeInMonths: 0
    }),

    getters: {
        minimumAgeInHours: (state) => state.minimumAgeInMonths * hrsInMonth,

        getUserById: (state) => {
            return (id: number): Person | undefined =>
                state.people.find(p => p.id === id)
        },

        peopleWithYears: (state) => {
            return state.people.map((person)=> ({
                ...person,
                ageInYears: Math.floor(person.ageInHours / hrsInYear)
            }))
        }
    },

    actions: {
        setMinimumAge(months: number){
            this.minimumAgeInMonths = months
        },

        setNewAge(userId: number, hours: number){
            const user = this.people.find(p => p.id === userId)
            if(!user) return

            user.ageInHours = hours
        }
    }
})