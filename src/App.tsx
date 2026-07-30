import './App.css'
import Table from './components/Table'
import ContactsInfo from "./components/ContactsInfo.tsx";
import {useUsers} from "./hooks/useUsers.ts";

export interface User{
  id:number
  name:string
  phone:string
  email:string
  note:string
  style:string
}

function App() {
  const { users, addUser, deleteUser, editUser } = useUsers();

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
         <Table users={users} addUser={addUser} />
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
