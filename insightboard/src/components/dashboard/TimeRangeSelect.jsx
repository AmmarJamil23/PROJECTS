import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue
     } from "../ui/select"

function TimeRangeSelect({ value, onChange}) {
    return (
     <Select value={value} onValueChange={onChange}>
        
        <SelectTrigger className="w-45">
            <SelectValue placeholder="Select range" />
        </SelectTrigger>

        <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="
            30d">Last 30 days</SelectItem>
        </SelectContent>

     </Select>
    )
}

export default TimeRangeSelect;