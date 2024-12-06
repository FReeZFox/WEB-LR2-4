import React, {useContext, useEffect, useState} from "react"
import {Modal, Button, Dropdown, Form, Row, Col} from "react-bootstrap"
import {Context} from "../index"
import {createBook} from "../http/AdminAPI"
import {fetchPublishers, fetchGenres} from "../http/BookAPI"
import {observer} from "mobx-react-lite"

const CreateBook = observer(({ show, onHide }) => {
    const { book } = useContext(Context)
    const [name, setName] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])
    const [imagePreview, setImagePreview] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetchGenres().then((data) => book.setGenres(data))
        fetchPublishers().then((data) => book.setPublishers(data))
    }, [book])

    const addInfo = () => {
        setInfo([...info, { title: "", description: "", number: Date.now() }])
    };

    const removeInfo = (number) => {
        setInfo(info.filter((i) => i.number !== number))
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)))
    };

    const selectFile = (e) => {
        const file = e.target.files[0]
        setFile(file);

        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => setImagePreview(event.target.result)
            reader.readAsDataURL(file)
        }
    };

    const addBook = async () => {
        const formData = new FormData();
        try {
            formData.append("name", name)
            formData.append("author", author)
            formData.append("price", `${price}`)
            formData.append("img", file)
            formData.append("publisherId", book.selectedPublisher.id)
            formData.append("genreId", book.selectedGenre.id)
            formData.append("info", JSON.stringify(info))
            await createBook(formData)
            alert('Книга успешно создана.')
            setName('')
            setAuthor('')
            setPrice(0)
            setFile(null)
            setInfo([])
            onHide()
            setImagePreview(null)
            setErrorMessage('')
        } catch (error) {
            if (error.response && error.response.data.message) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage("Произошла ошибка при добавлении книги.")
            }
        }
    };

    const isFormValid = () => {
        return name && author && price && file && book.selectedPublisher.id && book.selectedGenre.id
    };

    return (
        <Modal show={show} onHide={onHide} centered size="xl">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Добавить книгу</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6}>
                        <Form>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>
                                    {book.selectedGenre.name || "Выберите жанр"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {book.genres.map((genre) => (
                                        <Dropdown.Item
                                            onClick={() => book.setSelectedGenre(genre)}
                                            key={genre.id}
                                        >
                                            {genre.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>
                                    {book.selectedPublisher.name || "Выберите издательство"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {book.publishers.map((publisher) => (
                                        <Dropdown.Item
                                            onClick={() => book.setSelectedPublisher(publisher)}
                                            key={publisher.id}
                                        >
                                            {publisher.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form.Control
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-3"
                                placeholder="Введите название книги"
                            />
                            <Form.Control
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="mt-3"
                                placeholder="Введите автора книги"
                            />
                            <Form.Control
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="mt-3"
                                placeholder="Введите стоимость книги"
                                type="number"
                            />
                            <Form.Control className="mt-3" type="file" onChange={selectFile} />
                            <hr />
                            <Button
                                variant={"outline-dark"}
                                onClick={addInfo}
                                onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                                onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                            >
                                Добавить новое свойство
                            </Button>
                            {info.map((i) => (
                                <Row className="mt-4" key={i.number}>
                                    <Col md={4}>
                                        <Form.Control
                                            value={i.title}
                                            onChange={(e) =>
                                                changeInfo("title", e.target.value, i.number)
                                            }
                                            placeholder="Введите название свойства"
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Form.Control
                                            value={i.description}
                                            onChange={(e) =>
                                                changeInfo("description", e.target.value, i.number)
                                            }
                                            placeholder="Введите описание свойства"
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Button
                                            onClick={() => removeInfo(i.number)}
                                            variant={"outline-danger"}
                                            onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                                            onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                                        >
                                            Удалить
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                        </Form>
                    </Col>

                    <Col md={3}>
                        <div className="preview">
                            <h5>Предпросмотр книги</h5>
                            <div
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "10px",
                                    borderRadius: "5px",
                                }}
                            >
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{ width: "100%", marginBottom: "10px" }}
                                    />
                                ) : (
                                    <div style={{ textAlign: "center", marginBottom: "10px" }}>
                                        Нет изображения
                                    </div>
                                )}
                                <p><strong>Название:</strong> {name || "Введите название"}</p>
                                <p><strong>Автор:</strong> {author || "Введите автора"}</p>
                                <p><strong>Цена:</strong> {price || "Введите цену"}</p>
                                <p>
                                    <strong>Издательство:</strong>{" "}
                                    {book.selectedPublisher.name || "Выберите издательство"}
                                </p>
                                <p>
                                    <strong>Жанр:</strong> {book.selectedGenre.name || "Выберите жанр"}
                                </p>
                            </div>
                        </div>
                    </Col>

                    <Col md={3}>
                        <div className="preview">
                            <h5>Предпросмотр свойств</h5>
                            <div
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    maxHeight: "300px",
                                    overflowY: "auto",
                                }}
                            >
                                {info.length > 0 ? (
                                    info.map((i) => (
                                        <div key={i.number} style={{ marginBottom: "10px" }}>
                                            <p><strong>{i.title || "Название свойства"}</strong></p>
                                            <p>{i.description || "Описание свойства"}</p>
                                            <hr />
                                        </div>
                                    ))
                                ) : (
                                    <p>Нет добавленных свойств</p>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
                {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="outline-danger"
                    onClick={onHide}
                    onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                    onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                >
                    Закрыть
                </Button>
                <Button
                    variant="outline-success"
                    onClick={addBook}
                    disabled={!isFormValid()}
                    onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                    onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                >
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateBook;
