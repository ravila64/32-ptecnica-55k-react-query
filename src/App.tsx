import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
//import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList.tsx'
import { SortBy, type User } from './types/types.d'

const fetchUsers = async (page: number) => {
  return await fetch('https://randomuser.me/api?results=10&seed=midudev&page=${page}')
      // v.2.
      .then(async res=>{
        console.log("Page now ",page)
        console.log("status of res.ok ", res.ok, " res.status ", res.status, " res.statusText ", res.statusText)
        if(!res.ok) throw new Error('Error en la petición')
        return await res.json()
      })
      .then(res=>res.results)
}

function App() {
  const {isLoading, isError,  data: users=[] } = useQuery<User[]>(
    ['users'],
    async () => await fetchUsers(1)
  )

  // array de users
  //const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  //const [sortByCountry, setSortByCountry] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  
  //const [loading, setLoading] = useState(false);  //ver 2.0
  //const [error, setError] = useState(false); //v.2.0
  const [currentPage, setCurrentPage] = useState(1); //v.2.0

  //const originalUsers = useRef<User[]>([])

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
  const handleReset = () => {
    //setUsers(originalUsers.current)
  }

  const handleDelete = (email: string) => {
    // // filteredUsers = users.filter((user, userIndex)
    // // userIndex !== index
    // const filteredUsers = users.filter((user) => user.email !== email)
    // setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) =>{
    setSorting(sort)
  }

  // useEffect(() => {
  //   setLoading(true); //v.2.0
  //   setError(false);
  //   // v.2.0
  //   fetchUsers(currentPage)
  //      .then (users=>{
  //         setUsers(prevUsers =>{
  //           const newUsers= prevUsers.concat(users)
  //           originalUsers.current = newUsers
  //           return newUsers
  //         })
  //   })
  //   .catch(err => {
  //       // v.2.0
  //       setError(err);
  //       console.log(err)
  //     })

  //     //v.2.0
  //     .finally(()=>{
  //       setLoading(false);
  //     })
  // }, [currentPage])  // cada vez que cambie el valor de la var currentPage

  // tambien puede ser: const filteredUsers=filterCountry !== nul && filterCountry.length > 0
  const filteredUsers = useMemo(() => {
    console.log('calculate filteredUsers');
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      }) : users
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
    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting] 
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  return (
    <div className="App">
      <h1>Prueba técnica 55k - React Query</h1>
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
        }} />

      </header>
      {/* v.2.0  */}
      <main>
        { users.length>0 && 
          <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} showColors={showColors}
          users={sortedUsers} /> 
        }

        {loading && <strong>Cargando ...</strong>}
        {!loading && error && <p>Ha habido un error ...</p>}
        {!loading && !error && users.length===0 && <p>No hay usuarios ...</p>}
          
        {!loading && !error && <button onClick={()=>setCurrentPage(currentPage+1)}>Cargar mas resultados</button>}

      </main>
    </div >
  )
}

export default App
