import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DatePicker, ConfigProvider, Select } from "antd";
import Router from 'next/router';
import { delay } from "/functions/delay"

const MobileSearch = () => {

    const [options, setOptions] = useState([])
    const [search, setSearch] = useState(null);
    const [show, setShow] = useState(false);

    const handleSearch = (e) => {
        // e.length>0?
        if(options.length==0){
            axios.get(process.env.NEXT_PUBLIC_GET_TOUR_SEARCH,{
                headers:{'search':search}
            }).then((x)=>{
                setOptions(x.data.result);
            })//:null
        }
    };

    const handleChange = (e) => {
        setSearch(e)
    };

    useEffect(() => {
      showHero()
    }, []);

    async function showHero(){
        await delay(500);
        setShow(true)
    };
    
  return (
    <div className='hero-bg-01'>
      <div className='home-slider-styles'>
      <div className='hero-cont top-text pt-4'>
        <div className='text-center'>
            <h3 className='wh-txt hero-txt-1 fs-45 mt-3'>TICKETS <br/><span className='yellow-txt'>VALLEY</span></h3>
        </div>
      </div>
      {show && 
      <div className='mt-3'>
        <div className='search-container-mobile py-1'>
            <ConfigProvider theme={{token:{ colorPrimary:'green', borderRadius:0 }}}>
                <Select style={{width:'65%', textAlign:'left'}}
                    showSearch
                    value={search}
                    placeholder={"Search Tours, Packages, Tickets"}
                    onSearch={handleSearch}
                    onChange={handleChange}
                    dropdownStyle={{
                        maxHeight:100
                    }}
                    placement={"bottomRight"}
                    options={options?.map((x)=>{
                        return{ label:x.title, value:x.slug }
                    })}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                    ((option?.value) ?? '').toLowerCase().includes(input.toLowerCase())||
                    ((option?.label) ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                />
            </ConfigProvider>
            <ConfigProvider theme={{token:{ colorPrimary:'green', borderRadius:0 }}}>
                <DatePicker style={{ height:32, textAlign:'left', width:'20%'}} />
            </ConfigProvider>
            <button className='search-btn' style={{width:'15%', height:31}} onClick={()=>search?Router.push(`/product/${search}`):null}>{"Go"}</button>
        </div>
      </div>
      }
      </div>
    </div>
  )
}

export default React.memo(MobileSearch)