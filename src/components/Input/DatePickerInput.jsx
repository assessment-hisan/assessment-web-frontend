
import DatePicker from 'react-datepicker';

const DatePickerInput = ({startDate, setStartDate}) => {
    
  return (
    <div>
      <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
    />
    </div>
  )
}

export default DatePickerInput
