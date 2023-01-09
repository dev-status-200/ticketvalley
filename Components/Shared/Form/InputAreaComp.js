
import { Input } from "antd";
import { Controller } from "react-hook-form";

const InputAreaComp = (props) => {

  return (
    <>
    <Controller
      name={`${props.name}`}
      defaultValue=""
      control={props.control}
      {...props.register(`${props.name}`)}
      render={({ field }) => (
          <>
            <div>{props.label}</div>
            <Input.TextArea
            style={{minWidth:props.width}}
             {...field} 
             />
          </>
      )}
    />
    </>
  )
}

export default InputAreaComp
