import React,{useState, useEffect} from 'react';
import { supabase } from './createClient';
import './App.css'

const App = () => {

  const [users,setUsers]=useState([])

  const [user,setUser]=useState({
    Ship_name:'',Capacity:'',Location:'',Cargo:'',Cargo_value:''
  })

  const [user2,setUser2]=useState({
    id:'',Ship_name:'',Capacity:'',Location:'',Cargo:'',Cargo_value:''
  })



  console.log(user2)


  useEffect(() => {
    fetchUsers()
  }, [])
  

  async function fetchUsers(){
    const {data} = await supabase
      .from('ship_table')
      .select('*')
      setUsers(data)



  }

  function handleChange(event){
    
    setUser(prevFormData=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
  }

  function handleChange2(event){
    
    setUser2(prevFormData=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
  }

  async function createUser(){
    await supabase
    .from('ship_table')
    .insert({ Ship_name: user.Ship_name, Capacity: user.Capacity,Location:user.Location,Cargo:user.Cargo,Cargo_value:user.Cargo_value })

  fetchUsers()    
 

  }

  async function deleteUser(userId){

    const { data, error } = await supabase
      .from('ship_table')
      .delete()
      .eq('id', userId)

    fetchUsers()
    
    
    if (error){
      console.log(error)
    }

    if (data){
      console.log(data)
    }




  }

   function displayUser(userId){

    users.map((user)=>{

        if(user.id==userId){
          setUser2({ id:user.id,Ship_name: user.Ship_name, Capacity: user.Capacity,Location:user.Location,Cargo:user.Cargo,Cargo_value:user.Cargo_value})
        }
      



    })

   }


   async function updateUser(userId){

    const { data, error } = await supabase
      .from('ship_table')
      .update({ id:user2.id,Ship_name: user2.Ship_name, Capacity: user2.Capacity,Location:user2.Location,Cargo:user2.Cargo,Cargo_value:user2.Cargo_value})
      .eq('id', userId)

      await fetchUsers()



      if (error){
        console.log(error)
      }
  
      if (data){
        console.log(data)
      }


   }

  return (
    <div>

      {/* FORM 1 */}
      <form onSubmit={createUser}>
        <input 
          type="text"
          placeholder="Ship_Name"
          name='Ship_name'
          onChange={handleChange}
        
        />
        <input 
          type="text"
          placeholder="Capacity"
          name='Capacity'
          onChange={handleChange}
        
        />
        <input 
          type="text"
          placeholder="Location"
          name='Location'
          onChange={handleChange}
        
        />
        
        <input 
          type="text"
          placeholder="Cargo"
          name='Cargo'
          onChange={handleChange}
        
        />
        
        <input 
          type="number"
          placeholder="Cargo_value"
          name='Cargo_value'
          onChange={handleChange}
        
        />
        <button type='submit'>Create</button>

      </form>




      {/* FORM 2 */}
      <form onSubmit={()=>updateUser(user2.id)}>
      <input 
          type="text"
          name='Ship_name'
          onChange={handleChange2}
          defaultValue={user2.Ship_name}
        
        />
        <input 
          type="text"
          name='Capacity'
          onChange={handleChange2}
          defaultValue={user2.Capacity}

        />
        <input 
          type="text"
          name='Location'
          onChange={handleChange2}
          defaultValue={user2.Location}

        />
        
        <input 
          type="text"
          name='Cargo'
          onChange={handleChange2}
          defaultValue={user2.Cargo}
        
        />
        
        <input 
          type="number"
          name='Cargo_value'
          onChange={handleChange2} 
          defaultValue={user2.Cargo_value}
        />
        
        <button type='submit'>Save Changes</button>

      </form>



      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Ship_name</th>
            <th>Capacity</th>
            <th>Location</th>
            <th>Cargo</th>
            <th>Cargo_value</th>
            <th>Actions</th>

          </tr>
        </thead>

        <tbody>
          {users.map((user)=>
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.Ship_name}</td>
              <td>{user.Capacity}</td>
              <td>{user.Location}</td>
              <td>{user.Cargo}</td>
              <td>{user.Cargo_value}</td>
              
              <td>
                <button onClick={()=>{deleteUser(user.id)}}>Delete</button>
                <button onClick={()=>{displayUser(user.id)}}>Edit</button>
              
              </td>

            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App