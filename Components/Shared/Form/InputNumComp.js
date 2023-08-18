
import React from 'react';
import { InputNumber  } from "antd";
import { Controller } from "react-hook-form";

const InputNumComp = (props) => {

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
            <InputNumber
            style={{minWidth:props.width}}
             min="0"
             step={props.step}
             stringMode
             {...field} 
             />
          </>
      )}
    />
    </>
  )
}

export default React.memo(InputNumComp)
