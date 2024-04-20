import React from 'react'
import { useController } from "react-hook-form";
import { TimePicker } from 'antd';

const SelectComp = (props) => {
  const { control, name } = props;
  const { field: { onChange, onBlur, value, name: fieldName, ref } } = useController({ control, name });

return(
  <>
    <div className="mt-3">{props.label}</div>
    <TimePicker 
      ref={ref}
      value={value} 
      allowClear
      changeOnScroll
      onBlur={onBlur}
      name={fieldName} 
      use12Hours={true}
      format={'h:mm A'} 
      onChange={onChange} 
      style={{width:110}}
      {...props.rest}
    />
  </>
)}

export default React.memo(SelectComp)