import {makeAutoObservable} from "mobx";

export default class BookStore {
    constructor() {
        this._genres = []
        this._publishers = []
        this._books = []
        this._selectedGenre = {}
        this._selectedPublisher = {}
        makeAutoObservable(this)
    }

    setGenres(genres) {
        this._genres = genres
    }
    setPublishers(publishers) {
        this._publishers = publishers
    }
    setBooks(books) {
        this._books = books
    }

    setSelectedGenre(genre) {
        this._selectedGenre = genre
    }

    setSelectedPublisher(publisher) {
        this._selectedPublisher = publisher
    }

    get genres() {
        return this._genres
    }
    get publishers() {
        return this._publishers
    }
    get books() {
        return this._books
    }
    get selectedGenre() {
        return this._selectedGenre
    }
    get selectedPublisher() {
        return this._selectedPublisher
    }
}


