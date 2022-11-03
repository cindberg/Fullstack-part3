
import React from 'react'


const Persons = ({ personsToShow, personsToDelete }) => {
    console.log(personsToShow)
    return (

        <div>
            <ul>
                {personsToShow.map(person =>
                    <p key={person.name}>
                        {person.name} {person.number} <button onClick={() => personsToDelete(person)}>delete</button>
                    </p>

                )}

            </ul>

        </div>
    )
}
export default Persons