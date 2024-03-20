import React,{useState, useEffect} from 'react';
import { supabase } from './createClient';
import './crew.css'

const crew = () => {

  const [users,setUsers]=useState([])

  const [user,setUser]=useState({
    Name:'',Age:'',On_ship:''
  })

  const [user2,setUser2]=useState({
    id:'',Name:'',Age:'',On_ship:''
  })



  console.log(user2)


  useEffect(() => {
    fetchUsers()
  }, [])
  

  async function fetchUsers(){
    const {data} = await supabase
      .from('crew_table')
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
    .from('crew_table')
    .insert({ Name: user.Name, Age: user.Age,On_ship:user.On_ship })

  fetchUsers()    
 

  }

  async function deleteUser(userId){

    const { data, error } = await supabase
      .from('crew_table')
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
          setUser2({ id:user.id,Name:user.Name,Age:user.Age,On_ship:user.On_ship})
        }
      



    })

   }


   async function updateUser(userId){

    const { data, error } = await supabase
      .from('crew_table')
      .update({ id:user2.id,Name:user2.Name,Age:user2.Age,On_ship:user2.On_ship})
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
          placeholder="Name"
          name='Name'
          onChange={handleChange}
        
        />
        <input 
          type="number"
          placeholder="Age"
          name='Age'
          onChange={handleChange}
        
        />
        <input 
          type="text"
          placeholder="On_ship"
          name='On_ship'
          onChange={handleChange}
        
        />
        <button type='submit'>Create</button>

      </form>




      {/* FORM 2 */}
      <form onSubmit={()=>updateUser(user2.id)}>
        <input 
          type="text"
          name='Name'
          onChange={handleChange2}
          defaultValue={user2.Name}
        
        />
        <input 
          type="number"
          name='Age'
          onChange={handleChange2}
          defaultValue={user2.Age}

        
        />
        <input 
          type="text"
          name='On_ship'
          onChange={handleChange2}
          defaultValue={user2.On_ship}

        
        />
        <button type='submit'>Save Changes</button>

      </form>



      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>On_ship</th>
            <th>Actions</th>

          </tr>
        </thead>

        <tbody>
          {users.map((user)=>
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.Name}</td>
              <td>{user.Age}</td>
              <td>{user.On_ship}</td>
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

export default crew