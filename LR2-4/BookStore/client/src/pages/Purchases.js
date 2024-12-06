import React, {useState, useEffect} from 'react'
import {Image, Card, Row, Col, Container, Spinner} from 'react-bootstrap'
import {fetchPurchases} from '../http/CartAPI'

const Purchases = () => {
    const [purchases, setPurchases] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadPurchases = async () => {
            try {
                setLoading(true);
                const data = await fetchPurchases()
                setPurchases(data)
            } catch (err) {
                setError(err.response?.data?.message || 'Ошибка при загрузке покупок')
            } finally {
                setLoading(false)
            }
        };

        loadPurchases()
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    if (error) {
        return <div>Ошибка: {error}</div>
    }

    if (purchases.length === 0) {
        return <div>У вас еще нет покупок</div>
    }

    const formatDateKey = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0')
        const day = d.getDate().toString().padStart(2, '0')
        const hours = d.getHours().toString().padStart(2, '0')
        const minutes = d.getMinutes().toString().padStart(2, '0')
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const groupedPurchases = purchases.reduce((groups, purchase) => {
        const dateKey = formatDateKey(purchase.date)
        if (!groups[dateKey]) {
            groups[dateKey] = []
        }
        groups[dateKey].push(purchase)
        return groups
    }, {})

    return (
        <div style={{ background: 'linear-gradient(259deg, #1a1e28,#3b3b33,#ab9462)', minHeight: '95vh' }}>
            <Container>
                <h1 className="pb-2 text-white" style={{ marginTop: "10px"}}>Мои покупки</h1>
                {Object.keys(groupedPurchases).map((dateKey) => {
                    const purchasesInGroup = groupedPurchases[dateKey];

                    const totalAmount = purchasesInGroup.reduce((sum, purchase) => {
                        return sum + (purchase.book ? purchase.book.price : 0)
                    }, 0)

                    return (
                        <Card key={dateKey} className="mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                            <Card.Header className="d-flex align-items-center" >
                                <div style={{ fontSize: '20px', marginRight: '10px' }}><strong>{dateKey}</strong></div>
                                <div>
                                    <strong>Сумма: </strong>{totalAmount} ₽.
                                </div>
                            </Card.Header>
                            <Card.Body style={{backgroundColor: '#e8e8e8'}}>
                                <Row>
                                    {purchasesInGroup.map((purchase) => (
                                        <Col key={purchase.id} md={4} className="mb-3">
                                            <Card className="d-flex flex-row align-items-center" style={{ height: 'auto' }}>
                                                {purchase.book ? (
                                                    <>
                                                        <Image
                                                            variant="top"
                                                            src={process.env.REACT_APP_API_URL + purchase.book.img}
                                                            width={100}
                                                            height={130}
                                                            style={{ marginLeft: '10px', marginRight: '10px' }}
                                                        />
                                                        <Card.Body>
                                                            <div>
                                                                <strong>Книга:</strong> {purchase.book.name}
                                                            </div>
                                                            <div>
                                                                <strong>Автор:</strong> {purchase.book.author}
                                                            </div>
                                                            <div>
                                                                <strong>Цена:</strong> {purchase.book.price} ₽.
                                                            </div>
                                                            <div>
                                                                <strong>Дата покупки:</strong>{' '}
                                                                {new Date(purchase.date).toLocaleString()}
                                                            </div>
                                                        </Card.Body>
                                                    </>
                                                ) : (
                                                    <Card.Body>
                                                        <div>Книга была удалена, информация недоступна.</div>
                                                    </Card.Body>
                                                )}
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Card.Body>
                        </Card>
                    )
                })}
            </Container>
        </div>
    )
}

export default Purchases


