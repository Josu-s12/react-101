import React, { useState, useEffect } from 'react';

function App() {
    const [quotes, setQuotes] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        fetchQuotes();
    }, [searchValue]);

    const fetchQuotes = () => {
        let quoteUrl = 'https://thesimpsonsquoteapi.glitch.me/quotes?count=100';

        if (searchValue !== '') {
            quoteUrl += `&character=${searchValue}`;
        }

        fetch(quoteUrl)
            .then(response => response.json())
            .then(data => {
                setQuotes(data);
            })
            .catch(error => console.error('Error fetching quotes:', error));
    };

    const handleInputChange = event => {
        setSearchValue(event.target.value.trim().toLowerCase());
    };

    const containerStyle = {
        maxWidth: '1400px',
        margin: '0 auto',
        textAlign: 'center',
        padding: '20px',
    };

    const quoteContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridGap: '20px',
        justifyItems: 'center',
    };

    const quoteStyle = {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
    };

    const imgStyle = {
        maxWidth: '200px',
        marginBottom: '10px',
    };

    const h1Style = {
        marginBottom: '20px',
        width: '100%',
        height: '100%',
        backgroundColor: '#f8db27',
        padding: '10px',
        borderRadius: '10px',
        fontFamily: "'Courier New', Courier, monospace",
    };

    const inputStyle = {
        width: '50%',
        padding: '10px',
        marginBottom: '20px',
        borderRadius: '10px',
        fontFamily: "'Courier New', Courier, monospace",
    };

    return (
        <div style={containerStyle}>
            <h1 style={h1Style}>Los Simpsons Quotes</h1>
            <input
                type="text"
                id="searchInput"
                placeholder="Search character..."
                value={searchValue}
                onChange={handleInputChange}
                style={inputStyle}
            />
            <div id="quote-container" className="quote-container" style={quoteContainerStyle}>
                {quotes.length === 0 ? (
                    <p>No quotes found for this character.</p>
                ) : (
                    quotes.map((quote, index) => (
                        <div key={index} className="quote" style={quoteStyle}>
                            <img src={quote.image} alt={quote.character} style={imgStyle} />
                            <p>{quote.character}</p>
                            <p>"{quote.quote}"</p>
                            <a href={quote.characterDirection === 'Left' ? 'https://simpsons.fandom.com/wiki/' + quote.character.replace(/\s/g, '_') : '#'}>Link</a>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default App;
