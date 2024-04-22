import moment from "moment";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);

function reducerFunctions(state, action) {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case 'set': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'open': {
      return {
        ...state,
        visible: true,
      };
    }
    case 'close': {
      return {
        ...state,
        visible: false,
      };
    }
    default:
      return state;
  }
}

const initialState = {
  load:false,
  added:false,
  visible:false,
  edit:false,
  cutOff:true,

  title:"Mr.",
  name:"",
  email:"",
  code:"ae",
  contact:"+971 ",
  address:"none",
  booking:[
    {
      id:"", tour:"", title:"", check:"", adult_price:0.00, child_price:0.00, adult:0, child:0, infant:0, transfer:"1",
      transportPrice:0.00, date:"",  dated:false, dates:[], timed:false, timeSlots:[], timeSlot:'', address:"",
      price:0.00, name:"", email:"", contact:"", oldPrice:"", remarks:""
    }
  ]
};

const setTour = (tour, dispatchReducer, category) => {
  let tempBook = [];
  if(tour.TourOptions!=undefined){
    tour.TourOptions.forEach((x, i)=>{
      let tempDates = [];
      if(x.dated && x.dates.length>0){
        x.dates.forEach((x)=>{
          let tempDate = moment(x.date).add(1, 'days')
          tempDates.push(new Date(`${moment(tempDate).format('YYYY-MM-DD')}`))
        });
      }
      let tempTimes = [];
      if(x.timed && x.timeSlots.length>0){
        x.timeSlots.forEach((x)=>{
          tempTimes.push({slot:moment(x.slot, "HH:mm:ss").format("hh:mm A")})
        });
      }
      tempBook.push({
        id:x.id, tour:x.TourId, name:x.name, check:category=="Combo Tours"?true:false, adult_price:parseFloat(x.adult_price),
        child_price:parseFloat(x.child_price), adult:1, child:0, infant:0, transfer:x.transport?"Shared":"1", 
        date:'', dates:tempDates, dated:x.dated, timed:x.timed, timeSlots:tempTimes, 
        timeSlot:tempTimes.length>0?tempTimes[0].slot:null, price:parseFloat(x.adult_price),
        transportPrice:0.00, address:"", transport:x.transport, oldPrice:x.oldPrice, detail:x.detail, show:false
      })
    })
    dispatchReducer({ type: 'field', fieldName:'booking', payload: tempBook });
  }
}

function ValidateEmail(mail){
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
      return (true)
  }
  return (false)
}

const validateDate = (values) => {
  let result = true;
  values.forEach((x)=>{
      if(x.date=='' && x.check){
          result=false
      }
  })
  return result;
}

const validateName = (name) => {
  if (name>3)
  {
      return (true)
  }
  return (false)
}

const setDate = (temp, i, date, tour) => {
  temp[i].date = date;
  const day = dayjs.tz(dayjs(),"Asia/Dubai").diff(dayjs(date), 'day', true)
  const applyCufOff = (day<1 && day>0)?true:false
  const cutOff = dayjs(tour.cutOff,'HH:mm')
  const dubaiCurrent = dayjs.tz(dayjs(),"Asia/Dubai")
  console.log(applyCufOff?"Same Day":"Future Day")
  console.log(cutOff.hour(), 'cutoff hour');
  console.log(dubaiCurrent.hour(), 'dubai hour');
  console.log(dayjs().hour(), 'current hour');
  console.log(cutOff.hour()+1>dubaiCurrent.hour()?true:false);
  if(applyCufOff && tour.cutOff!=null && tour.cutOff!=undefined){
    temp[i].available = cutOff.hour()+1>dubaiCurrent.hour()?true:false
  } else {
    temp[i].available = true
  }
  return temp
}

export { initialState, reducerFunctions, setTour, validateName, validateDate, ValidateEmail, setDate }