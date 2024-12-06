import React, {useContext} from 'react'
import {Dropdown, DropdownButton} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'
import {Context} from '../index'

const GenreBar = observer(() => {
    const {book} = useContext(Context)
    
    const handleSelect = (genre) => {
        if (genre === "none") {
            book.setSelectedGenre({})
        } else {
            const selectedGenre = book.genres.find(g => g.id === genre.id)
            book.setSelectedGenre(selectedGenre);
        }
    };

    const activeStyle = {
        backgroundColor: '#6c757d',
        color: 'white'
    };

    return (
        <div style={{ position: 'relative', zIndex: 2 }}>
            <DropdownButton
                id="genre-dropdown"
                title={book.selectedGenre.name ? book.selectedGenre.name : "Жанр"}
                variant="light"
                style={{ width: '200px' }}
                className="mt-3 ml-0" 
                onMouseDown={(e) => (e.target.style.transform = 'scale(0.9)')}
                onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
            >
                <Dropdown.Item
                    eventKey="none"
                    onClick={() => handleSelect("none")}
                    active={!book.selectedGenre.id}
                    style={!book.selectedGenre.id ? activeStyle : {}}
                >
                    Не задано
                </Dropdown.Item>
                {book.genres.map((genre) => (
                    <Dropdown.Item
                        key={genre.id}
                        eventKey={genre.id}
                        onClick={() => handleSelect(genre)}
                        active={genre.id === book.selectedGenre.id}
                        style={genre.id === book.selectedGenre.id ? activeStyle : {}}
                    >
                        {genre.name}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        </div>
    )
})

export default GenreBar
