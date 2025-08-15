import { useMemo, useState } from 'react'
// import { useEffect, useMemo, useRef, useState } from 'react'
// import { useInfiniteQuery } from '@tanStack/react-query'
import './App.css'
import { UsersList } from './components/UsersList.tsx'
import { SortBy, type User } from './types/types.d'
import { Results } from './components/Results.tsx'
import { useUsers } from './hooks/useUsers.ts'

// const fetchUsers = async ( page: number ) => {
//   return await fetch(`https://randomuser.me/api?results=10&seek=ravila&page=${page}`)
//   .then(async res =>{
//     if (!res.ok) throw new Error("Error en la petición")
//     return await res.json()
//   })
//   .then(res => {
//     const nextCursor = Number(res.info.page)
//     return{
//       users: res.results,
//       nextCursor
//     }
//   }
// ) 

function App() {
  const {isLoading, isError, users, refetch, fetchNextPage, hasNextPage } = useUsers()

  console.log("users ------>",users); 
  //console.log(users?.pages?.flatMap(page=>page.users));
  //const users: User[]=users?.pages?.[0].users ?? [];
  // se utiliza para un infinite scrooll
  //const users: User[]=users?.pages?.flatMap(page=>page.users) ?? [];
 
  // array de users
  //const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  //const [sortByCountry, setSortByCountry] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  
  //const [loading, setLoading] = useState(false);  //ver 2.0
  //const [error, setError] = useState(false); //v.2.0
  //const [currentPage, setCurrentPage] = useState(1); //v.2.0
  //const originalUsers = useRef<User[]>([])   // quito v.2.0 

  //const [originalUsers, setOroginalUsers] = useState<User[]>([]);
  // esta linea anterior no se debe hacer, crear otro useState
  // useRef -> para guardar un valor que queremos que se comparta
  // entre renderizados, pero que al cambiar, no vuelva a renderizar el componente 
  // Implement a feature that allows the user to restore the initial state, 
  // meaning that all deleted rows will be recovered.
  
  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    // esto se llama callback prevState=>!prevState
    const newSortingValue = (sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE)
    setSorting(newSortingValue)
    // setSortByCountry(prevState => !prevState)
  }

  const handleReset = async () => {
    //setUsers(originalUsers.current)
    //await refetch() // paso async-await vers.2.0 -> se quito away coloco void
    void  refetch();
  }

  const handleDelete = (email: string) => {
    console.log(email);
    // // filteredUsers = users.filter((user, userIndex)
    // // userIndex !== index
    // const filteredUsers = users.filter((user) => user.email !== email)
    // setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) =>{
    setSorting(sort)
  }

  // tambien puede ser: const filteredUsers=filterCountry !== null && filterCountry.length > 0
  
  const filteredUsers = useMemo(() => {
    console.log('calculate filteredUsers')
    return filterCountry != null && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])


  // validacion ternaria
  // estaba [..users].sort((a,b) =>){}
  // se quito users x filteredUsers
  const sortedUsers = useMemo(() => {
    console.log('calculate sortedUsers');
    if(sorting===SortBy.NONE) return filteredUsers
    const compareProperties: Record<string, (user:User) => any> ={
      [SortBy.COUNTRY]: user=> user.location.country,
      [SortBy.NAME]: user=> user.name.first,
      [SortBy.LAST]: user=> user.name.last
    }
    return filteredUsers.toSorted((a:User, b:User) => {
      const extractProperty = compareProperties[sorting] 
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  return (
    <div className="App">
      <h1>Prueba técnica 55k - React Query</h1>
      <Results />
      <header>
        <button onClick={toggleColors}>
          Color rows
         </button>

        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'unSorted-Country' : 'sorted-Country'}
        </button>

        <button onClick={handleReset}>
          Reset state
        </button>

        <input placeholder='Filtra por pais' onChange={(e) => {
          setFilterCountry(e.target.value)
        }} 
        />

      </header>
      <main>
        { users.length>0 && 
          <UsersList changeSorting={handleChangeSort} 
          deleteUser={handleDelete} 
          showColors={showColors} 
          users={sortedUsers} /> 
        }

        {isLoading && <strong>Cargando ...</strong>}
        {!isError && <p>Ha habido un error ...</p>}
        {!isLoading && !isError && users.length===0 && <p>No hay usuarios ...</p>}
          
        {!isLoading && !isError && hasNextPage === true &&
        <button onClick={()=> {void fetchNextPage()}}>Cargar mas resultados</button>}

        {!isLoading && !isError && hasNextPage === false && 
        <p>No hay mas resultados</p>}
      </main>
    </div >
  )
}

export default App
