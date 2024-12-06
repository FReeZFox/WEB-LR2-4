import {React, useContext} from 'react'
import {observer} from 'mobx-react-lite'
import {Row} from "react-bootstrap"
import {Context} from '../index'
import BookItem from '../components/BookItem'

const BookList = observer(() => {
    const { book } = useContext(Context)

    return (
        <Row className="d-flex" style={{ marginLeft: '-90px' }}>
            {book.books.map(book =>
                <BookItem key={book.id} book={book} />
            )}
        </Row>
    )
})

export default BookList
