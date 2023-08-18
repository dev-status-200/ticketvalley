import React from 'react';
import { Form, DatePicker } from 'antd';
import { Controller  } from "react-hook-form";

const DateComp = (props) => {
  return (
  <>
    <Controller
      name={`${props.name}`}
      defaultValue=""
      control={props.control}
      {...props.register(`${props.name}`)}
      render={({ field }) => (
        <>
          <div className='mt-3'>{props.label}</div>
          <DatePicker {...field} />
        </>
      )}
    />
  </>
  )
}
export default React.memo(DateComp)