// import React from 'react'
// import { Input } from "antd";
// import { Controller } from "react-hook-form";

// const InputAreaComp = (props) => {

//   return (
//     <>
//     <Controller
//       name={`${props.name}`}
//       defaultValue=""
//       control={props.control}
//       {...props.register(`${props.name}`)}
//       render={({ field }) => (
//           <>
//             <div className="mt-3">{props.label}</div>
//             <Input.TextArea
//             style={{minWidth:props.width}}
//              {...field} 
//              />
//           </>
//       )}
//     />
//     </>
//   )
// }

// export default React.memo(InputAreaComp)


import React from 'react'
import { Input, Form } from "antd";
import { useController } from "react-hook-form";
const { TextArea } = Input;

const TextComp = (props) => {
  const { control, name } = props;
  const { field: { onChange, onBlur, value, name: fieldName, ref } } = useController({ control, name });

  return (
    <>
      <div className="mt-3">{props.label}</div>
      <TextArea {...props.rest} name={fieldName} onChange={onChange} value={value} ref={ref} onBlur={onBlur} style={{minWidth:props.width, fontSize:12}} />
    </>
  )
}

export default React.memo(TextComp)