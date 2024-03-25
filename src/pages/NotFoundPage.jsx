import {Link} from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <>
    <head>
        <title>Uh-Oh, The Scroll Doesn't Exist!</title>
    </head>
    <body>
        <h1>Uh-Oh, The Scroll Doesn't Exist!</h1>
        <h2>A Wild 404 Appears!</h2>
        <p>Hark! Brave adventurer, it seems you've stumbled upon a path that leads to... well, nowhere. The ancient scroll you seek is not within our grand library. Perhaps it was stolen by a mischievous goblin, or maybe it was incinerated by a dragon's fiery breath. Alas, the mysteries of the realm are many!</p>
        <p>But fear not! You can always return to the <Link to="/">home page</Link> to continue.</p>
    </body>
    </>    
  )
}
