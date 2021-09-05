import React, { useEffect, useState } from 'react';

import axios from 'axios';

interface Quote {
    author: string;
    quote: string;
    quote_id: number;
    series: 'Breaking bad'; // in dit geval is dit denk ik altijd Breaking bad. Je zou ook string kunnen doen maar met Typescript is het hoe preciezer hoe beter
}

const Waltjr = () => {
    const [items, setItems] = useState<null | Quote[]>(null); // Quote[] betekent dat het een array met Quote Objects is

    const fetchItems = async () => {
        const result = await axios(`https://www.breakingbadapi.com/api/quote/random?author=Skyler+White`);

        console.log(result.data);

        setItems(result.data);
        // omdat je altijd maar een quote terugkrijgt zou je ook misschien alleen de quote kunnen opslaan in the state. Misschien netter dus iets van setItems(result.data[0])
        // dan moet je dus ook de TS aanpassen. Ook kan je items misschien veranderen in quotes omdat duidelijker is.
    };

    useEffect(() => {
        fetchItems();
    }, []);

    // items is een array met Objects, in dit geval 1 object. Als je dat Object wil hebben kan je doen items[0]. Vervolgens wil je bijvoorbeeld de quote weergeven
    // en dus kan je items[0].quote doen.

    return (
        <div>
            {/* ik heb er `items &&` voor gezet, ik weet niet of je deze notatie kent maar dit is een soort if statement. Het betekent dat het 'truthy' moet zijn om de
          quote te laten zien. (truthy betekent een soort van true haha. Dus als het niet null of undefined is dan is  het truthy) als je dit deel weggaat zie je een TS error */}
            <p>new quote:{items && items[0].quote}</p>
            <button onClick={fetchItems}>Get new Quote</button>
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
