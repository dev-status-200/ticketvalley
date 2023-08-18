import React from 'react'
import { Input, Form } from "antd";
import { Controller  } from "react-hook-form";

const InputComp = (props) => {

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
            <Input disabled={props.disabled} {...field} />
          </>
      )}
    />
    </>
  )
}

export default React.memo(InputComp)
