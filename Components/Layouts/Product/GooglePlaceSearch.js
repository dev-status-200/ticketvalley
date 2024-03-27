import React, { useRef } from 'react';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import { Input } from 'antd';
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const libraries = ["places"]

const GooglePlaceSearch = ({dispatchReducer, state, index}) => {

    const inputRef = useRef();

    const handleChange = () => {
        const [place] = inputRef.current.getPlaces();
        if(place){
            setAddress(place.formatted_address);
        }
    };

    const setAddress = (address) => {
        let temp = [...state.booking];
        temp[index].address = address;
        dispatchReducer({type: 'field', fieldName:'booking', payload: temp});
    };

  return (
    <>
    <LoadScript
        googleMapsApiKey='AIzaSyDNlNHouprfGHm_3mmfLutARQbIwuNamJk'
        libraries={libraries}
    >
        <StandaloneSearchBox
            onLoad={ref => (inputRef.current = ref)}
            onPlacesChanged={handleChange}
        >
            <Input 
                placeholder="Pickup Addres" style={{width:'100%'}} 
                value={state.booking[index].address}
                onChange={(e)=>setAddress(e.target.value)}
            />
        </StandaloneSearchBox>
    </LoadScript>
    {/* 
        <GooglePlacesAutocomplete
            apiKey="AIzaSyDNlNHouprfGHm_3mmfLutARQbIwuNamJk"
            selectProps={{
                onChange: (res)=> {
                    let temp = [...state.booking];
                    temp[i].address = res.label;
                    dispatchReducer({type: 'field', fieldName:'booking', payload: temp});
                },
                placeholder: 'Pick up Address',
                components : {
                    IndicatorSeparator: () => null,
                    DropdownIndicator: () => 
                    <>
                        <span className='mx-2' style={{color:'silver'}}>Powered By Google </span>
                        <MdPlace style={{fontSize:20, position:'relative', bottom:0, right:5, color:'#4a9fe8'}} />
                    </>
                },
            }}
        /> 
    */}
    </>
  )
}

export default React.memo(GooglePlaceSearch)