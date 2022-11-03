import React from 'react'
const PersonForm = ({ addPerson, handleAddName, handleAddNumber, newName, newNumber }) => {

    return (
        <form onSubmit={addPerson}>
            <div>
                Name: 
                <input 
                value={newName} 
                onChange={handleAddName} />
            </div>
            <div>
                Number: <input 
                value={newNumber} 
                onChange={handleAddNumber} />
            </div>
            <div>
                <button type="submit"> Add </button>
            </div>
        </form>
    )
}
export default PersonForm
