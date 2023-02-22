import {Spinner} from 'react-bootstrap';
import Image from 'next/image';

const Loader = () => {
    return (
        <div style={{backgroundColor:'white', height:'50vh', paddingTop:'5%'}}> 
            <div className="text-center">
            <img src={'/loader.svg'}  />
              </div>
        </div>
    )
}

export default Loader