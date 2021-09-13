import React, { useEffect, useState, useCallback } from 'react';

import axios from 'axios';

interface Liveweer {
    plaats: string;
    d0weer: string;
    temp: string;
    windr: string;
    d0windknp: string;
    quote: string;
    // quote_id: number;
    // series: 'Breaking bad'; // in dit geval is dit denk ik altijd Breaking bad. Je zou ook string kunnen doen maar met Typescript is het hoe preciezer hoe beter
}

const Weerupdate = () => {
    const [weer, setWeer] = useState<null | Liveweer>(null); // Quote[] betekent dat het een array met Quote Objects is
    const [location, setLocation] = useState('Amsterdam');
    const handleInputChange = useCallback(
        (e) => {
            setLocation(e.target.value);
        },
        [setLocation],
    );
    const fetchItems = async () => {
        try {
            const response = await axios(
                `http://weerlive.nl/api/json-data-10min.php?key=8214e7ecd2&locatie=${location}&callback=?`,
            );
            console.log('dadsada', response);

            setWeer(response.data?.liveweer?.[0]);
        } catch (error) {
            console.error(error);
        }

        // omdat je altijd maar een quote terugkrijgt zou je ook misschien alleen de quote kunnen opslaan in the state. Misschien netter dus iets van setItems(result.data[0])
        // dan moet je dus ook de TS aanpassen. Ook kan je items misschien veranderen in quotes omdat duidelijker is.
    };

    useEffect(() => {
        fetchItems();
    }, [location]);

    // items is een array met Objects, in dit geval 1 object. Als je dat Object wil hebben kan je doen items[0]. Vervolgens wil je bijvoorbeeld de quote weergeven
    // en dus kan je items[0].quote doen.

    return (
        <div>
            {/* ik heb er `items &&` voor gezet, ik weet niet of je deze notatie kent maar dit is een soort if statement. Het betekent dat het 'truthy' moet zijn om de
          quote te laten zien. (truthy betekent een soort van true haha. Dus als het niet null of undefined is dan is  het truthy) als je dit deel weggaat zie je een TS error */}
            {/* <p>windrichting:{items && items.liveweer[0].temp} </p> */}
            <h1>Current Wheater</h1>
            {weer && (
                <div>
                    <p>Location:{weer.plaats}</p>
                    <p>temp:{weer.temp}</p>
                    <p>wind direction:{weer.windr}</p>
                    <p>windspeed knots:{weer.d0windknp}</p>
                </div>
            )}
            <input value={location} onChange={handleInputChange} />
            <button onClick={fetchItems}>Get Wheater </button>
        </div>
    );
};

export default Weerupdate;
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
