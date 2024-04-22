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

    const setRemarks = (remarks) => {
      let temp = [...state.booking];
      temp[index].remarks = remarks;
      dispatchReducer({type: 'field', fieldName:'booking', payload: temp});
    };

  return (
    <>
    <div className='grey-txt-2 fw-500'>Note: Pickup available on Dubai Address only !</div>
    <div className='mt-1'>Address:</div>
    <LoadScript
      googleMapsApiKey='AIzaSyDNlNHouprfGHm_3mmfLutARQbIwuNamJk'
      libraries={libraries}
    >
      <StandaloneSearchBox
        onLoad={ref => (inputRef.current = ref)}
        onPlacesChanged={handleChange}
      >
        <Input 
          placeholder="Pickup Address" style={{width:'98%'}} 
          value={state.booking[index].address}
          onChange={(e)=>setAddress(e.target.value)}
        />
      </StandaloneSearchBox>
    </LoadScript>
       <div className='mt-2'>Remarks:</div>
       <Input 
          placeholder="Address Remarks" style={{width:'98%'}} 
          value={state.booking[index].remarks}
          onChange={(e)=>setRemarks(e.target.value)}
        />
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