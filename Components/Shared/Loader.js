import {Spinner} from 'react-bootstrap';
import Image from 'next/image';

const Loader = () => {
    return (
        <div>
            <div className="text-center" style={{position:"relative",top:"300px"}}>
            <img src={'/loader.svg'}  />
              </div>
        </div>
    )
}

export default Loader