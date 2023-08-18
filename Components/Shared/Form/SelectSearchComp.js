import { Select } from "antd";
import { Controller } from "react-hook-form";

const SelectSearchComp = (props) => {

    const SelectSearch =({props, field}) => {

        let tempVal = [];
        
        props.options.forEach((x) => {
            tempVal.push({
                value:x.id,
                label:x.name
            })
        });

        return(
            <Select disabled={props.disabled} style={{minWidth:props.width||200}} 
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={tempVal}
                {...field}
            />
        )
    }


return(
    <Controller
      name={`${props.name}`}
      defaultValue=""
      control={props.control}
      {...props.register(`${props.name}`)}
      render={({ field }) => (
        <>
          <div className="mt-2">{props.label}</div>
          <SelectSearch props={props} field={field} />
        </>
      )}
    />
)}

export default React.memo(SelectSearchComp)