import React, { useState } from 'react';
import axios from 'axios';
import { DatePicker, ConfigProvider, Select } from "antd";
import Router from 'next/router';

const SearchBar = () => {

    const [options, setOptions] = useState([])
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        if(options?.length==0){
            axios.get(process.env.NEXT_PUBLIC_GET_TOUR_SEARCH,{
                headers:{'search':search}
            }).then((x)=>{
                setOptions(x.data.result);
            })
        }
    };

    const handleChange = (e) => {
        setSearch(e)
    };

  return (
    <div className='search-container'>
        <ConfigProvider theme={{token:{ borderRadius:0 }}}>
            <Select
                showSearch
                placeholder={"Search Activities, Tours, Tickets"}
                style={{width:'66%', height:50, textAlign:'left'}}
                size="large"
                // value={search}
                onSearch={handleSearch}
                onChange={handleChange}
                dropdownStyle={{
                    maxHeight:100, borderRadius:0, backgroundColor:'white'
                }}
                options={options?.map((x)=>{
                    return{ label:x.title, value:x.slug }
                })}
                optionFilterProp="children"
                filterOption={(input, opt) =>
                    ((opt?.value) ?? '').toLowerCase().includes(input.toLowerCase())||
                    ((opt?.label) ?? '').toLowerCase().includes(input.toLowerCase())
                }
            />
        </ConfigProvider>
        <ConfigProvider theme={{token:{ borderRadius:0 }}}>
            <DatePicker style={{  textAlign:'left', width:'22%', height:40, position:'relative', bottom:0.2}} />
        </ConfigProvider>
        <button 
            style={{width:'12%'}}
            className='search-btn' 
            onClick={()=>search?Router.push(`/product/${search}`):null}
        >
            {"Go"}
        </button>
    </div>
  )
}

export default React.memo(SearchBar)