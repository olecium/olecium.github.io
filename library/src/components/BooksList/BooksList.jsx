import React from "react";

const BooksList = (props) => {
    return (
        <div>
            <h1>Все книги</h1>
            {
                props.books.map(b => {
                    return (

                        <li key={b.id}>
                            <h3>{b.title}</h3>
                            <p>{b.description}</p>
                            <p>{b.first_name} {b.surname}</p>
                            <button>Добавить в избранное</button>
                        </li>

                    )
                })
            }
        </div>
    )
}
export default BooksList;
