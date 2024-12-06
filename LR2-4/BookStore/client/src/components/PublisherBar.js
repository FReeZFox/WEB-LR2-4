import React, {useContext} from 'react'
import {Dropdown, DropdownButton} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'
import {Context} from '../index'

const PublisherBar = observer(() => {
    const { book } = useContext(Context)

    const handleSelect = (publisher) => {
        if (publisher === "none") {
            book.setSelectedPublisher({})
        } else {
            const selectedPublisher = book.publishers.find(p => p.id === publisher.id)
            book.setSelectedPublisher(selectedPublisher)
        }
    }

    const activeStyle = {
        backgroundColor: '#6c757d',
        color: 'white'
    }

    return (
        <DropdownButton
            id="publisher-dropdown"
            title={book.selectedPublisher.name ? book.selectedPublisher.name : "Издательство"}
            variant="light"
            style={{ width: '200px' }}
            className="mt-2 ml-0"
            onMouseDown={(e) => (e.target.style.transform = 'scale(0.9)')}
            onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
        >
            <Dropdown.Item
                eventKey="none"
                onClick={() => handleSelect("none")}
                active={!book.selectedPublisher.id}
                style={!book.selectedPublisher.id ? activeStyle : {}}
            >
                Не задано
            </Dropdown.Item>
            {book.publishers.map((publisher) => (
                <Dropdown.Item
                    key={publisher.id}
                    eventKey={publisher.id}
                    onClick={() => handleSelect(publisher)}
                    active={publisher.id === book.selectedPublisher.id}
                    style={publisher.id === book.selectedPublisher.id ? activeStyle : {}}
                >
                    {publisher.name}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    )
})

export default PublisherBar;
