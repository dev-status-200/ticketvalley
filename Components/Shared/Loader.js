import {Spinner} from 'react-bootstrap';

const Loader = () => {
    return (
        <div>
            <div className="text-center" style={{position:"relative",top:"300px"}}>
                <Spinner animation="border" style={{height:"50px", width:"50px"}} />
                <div className="mt-2">Loading...</div>
              </div>
        </div>
    )
}

export default Loader