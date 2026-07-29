import './App.css'
import Table from './components/Table'
import ContactsInfo from "./components/ContactsInfo.tsx";
import {useEffect, useState} from "react";

export interface User{
  id:number
  name:string
  phone:number
  email:string
}

function App() {

  const [users,setUsers] = useState<User[]>([]);

  useEffect(()=> {
    async function getUsers() {
      const response= await fetch("/users.json")
      const data : User[] = await response.json()

      setUsers(data)
    }
    getUsers()
  },[])

      return(
   <>
     <main className="flex h-screen p-5">
       <aside
           className="
            w-[35%]
            bg-[rgb(232_238_252/53%)]
            rounded-l-2xl
            border
            border-gray-300
        "
       >
         <Table users={users} />
       </aside>

       <div
           className="
            w-[65%]
            bg-white
            rounded-r-2xl
            border
            border-l-0
            border-gray-300
        "
       >
         <ContactsInfo />
       </div>
     </main>
   </>)
}

export default App
