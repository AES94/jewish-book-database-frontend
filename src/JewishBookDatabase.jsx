import React, { useState, useEffect } from "react";

export default function JewishBookDatabase() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [publisher, setPublisher] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      let query = [];
      if (search) query.push(`search=${encodeURIComponent(search)}`);
      if (genre) query.push(`genre=${encodeURIComponent(genre)}`);
      if (publisher) query.push(`publisher=${encodeURIComponent(publisher)}`);

      const url = `https://jewish-book-database-backend.onrender.com/books${
        query.length ? `?${query.join("&")}` : ""
      }`;

      const res = await fetch(url);
      const data = await res.json();
      setBooks(data);
    };

    fetchBooks();
  }, [search, genre, publisher]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold">Jewish Book Database</h1>
        <p className="text-lg text-gray-600">
          A database of new, recent, and forthcoming English language books with Jewish subjects and themes.
        </p>
      </header>

      <nav className="flex justify-center gap-6 mb-4 text-lg font-medium">
        <button className="border-b-2 border-black">New Books</button>
        <button className="text-gray-500 hover:text-black">Recent</button>
        <button className="text-gray-500 hover:text-black">Forthcoming</button>
        <button className="ml-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit a Book
        </button>
      </nav>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search"
          className="w-full border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="w-full sm:w-1/3 border p-2 rounded"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">Genre</option>
          <option value="Fiction">Fiction</option>
          <option value="History">History</option>
          <option value="Memoir">Memoir</option>
          <option value="Philosophy">Philosophy</option>
          <option value="Theology">Theology</option>
        </select>
        <select
          className="w-full sm:w-1/3 border p-2 rounded"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
        >
          <option value="">Publisher</option>
          <option value="Yale University Press">Yale University Press</option>
          <option value="Schocken">Schocken</option>
          <option value="JPS">Jewish Publication Society</option>
          <option value="Knopf">Knopf</option>
        </select>
      </div>

      <section className="grid gap-4">
        {books.length === 0 ? (
          <p className="text-gray-500">No books found.</p>
        ) : (
          books.map((book) => (
            <div key={book._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-700 italic">{book.author}</p>
              <p className="text-sm text-gray-500">
                {book.publisher} — {new Date(book.releaseDate).toLocaleDateString()}
              </p>
              <p className="mt-2">{book.blurb}</p>
              {book.coverUrl && (
                <img src={book.coverUrl} alt={book.title} className="mt-4 max-w-xs" />
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
}
