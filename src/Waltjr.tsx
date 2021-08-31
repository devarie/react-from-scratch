import React, { useEffect, useState } from 'react';

const axios = require('axios').default;

const Waltjr = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios(`https://www.breakingbadapi.com/api/quote/random?author=Skyler+White`);

            console.log(result.data);

            setItems(result.data);
        };

        fetchItems();
    }, [items]);

    return (
        <div>
            <p>new quote:{items}</p>
            <button></button>
        </div>
    );
};

export default Waltjr;

//     return (
//       <div className='container'>
//         <Header />
//         <Search getQuery={(q) => setQuery(q)} />
//         <CharacterGrid isLoading={isLoading} items={items} />
//       </div>
//     )
//   }

//   export default App

//endpoint https://www.breakingbadapi.com/api/quote/random?author=Walter+White+Jr.//
