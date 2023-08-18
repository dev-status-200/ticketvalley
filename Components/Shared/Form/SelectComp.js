import React from 'react'
import { Select } from "antd";
import { Controller } from "react-hook-form";

const SelectComp = (props) => {
  return (
    <>
    <Controller
      name={`${props.name}`}
      defaultValue=""
      control={props.control}
      {...props.register(`${props.name}`)}
      render={({ field }) => (
        <>
          <div className="mt-3">{props.label}</div>
          <Select disabled={props.disabled} style={{minWidth:props.width||200}} 
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
            }
            {...field}
          >
            {
              props.options.map((x, index) => {
                return(
                  <Select.Option value={x.id}>{x.name}</Select.Option>
                )
              })
            }
          </Select>
        </>
      )}
    />
    </>
  )
}

export default React.memo(SelectComp)