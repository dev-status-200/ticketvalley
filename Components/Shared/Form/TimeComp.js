import { TimePicker } from 'antd';
import { Controller } from "react-hook-form";

const TimeComp = (props) => {
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
          <TimePicker {...field} />
        </>
      )}
    />
  </>
  )
}
export default React.memo(TimeComp)