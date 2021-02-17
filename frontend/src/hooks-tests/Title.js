import react, { useEffect, useState } from 'react';

const Title = () => {

    const [title, setTitle] = useState( "Valor inicial" );

    useEffect( () => {
        document.title = title;
    }, [title] );

    return (
        <div className="App">
            <form>
                <input type="text" onChange={( e ) => setTitle( e.target.value )} />
            </form>
        </div>
    );
};

export default Title;