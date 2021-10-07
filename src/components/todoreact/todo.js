import React, { useState, useEffect } from 'react'
import  "./style.css"

const getLocalData = () => {
    const list = localStorage.getItem("mytodolist")
    if(list){
        return  JSON.parse(list);
    }   
     else{ 
         return[];

        }
    
}
const Todo = () => {
    const [inputData ,setinputData] = useState("");
    const [items, setitems] = useState(getLocalData());

  /*   add the items fn */
  const addItem= () =>{
      if (!inputData){
          alert("Enter Todo Task First")
      }
      else{
        const newInputData ={
            id:new Date().getTime().toString(),
            name:inputData,
        }
          setitems([...items, newInputData]);
          setinputData("")
      }
  }
   /*  delete items */
   const deleteItem =(index) =>{
       const updateItem = items.filter((curElem) =>{
           return curElem.id !== index;
       })
       setitems(updateItem);
   }
   const removeAll = () =>{
       setitems([]);
   }
   /* adding localStorage */
        useEffect(() => {
            localStorage.setItem("mytodolist", JSON.stringify(items));
        }, [items])
    return (
        <>
        
         <div className="main-div">
            <div className="child-div">
                <figure>
                    
                  <img src="./images/todo.svg" alt="logo" />
                  <figcaption>Add Task's To your Todo List</figcaption>
                </figure>
                <div className="addItems"></div>
                    <input 
                    type="text" 
                    placeholder="Add Items ✔ 📝" 
                    className="form-control" value={inputData} onChange={ (event) => setinputData(event.target.value)} />
                    <i className="fa fa-plus-circle add-btn" onClick={addItem}></i>
                </div>
               
                    <div className="showItems">
                        { items.map((curElem) => {
                            return(
                                <div className="eachItem" key={curElem.id}>
                            <h3>{ curElem.name  }</h3>
                            <div className ="todo-btn"></div>
                            {/* <i className="far fa-edit add-btn"></i> */}
                            <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                        </div>

                            )
                        })}
                        
                    </div>
                    

                    <div className="showItems"><button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}> <span> CHECK LIST </span> </button></div>
         </div>   
         
        </>
    )
}

export default Todo;