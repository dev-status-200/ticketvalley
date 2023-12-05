import { Radio } from 'antd';
import { Controller } from "react-hook-form";

const RadioComp = (props) => {

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
            <Radio.Group disabled={props.disabled} options={props.options} {...field} />
          </>
      )}
    />
    </>
  )
}

export default React.memo(RadioComp)
