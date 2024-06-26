const format = 'HH:mm';
import dayjs from 'dayjs';

function reducerFunctions(state, action) {
  switch (action.type) {
    case 'set': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case 'create': {
      return {
        ...state,
        visible: true,
        edit: false,
      };
    }
    case 'bulkCreate': {
      return {
        ...state,
        bulk: true,
        visible: true,
        edit: false,
      };
    }
    case 'edit': {
      return {
        ...state,
        selectedRecord: action.payload,
        visible: true,
        edit: true,
      };
    }
    case 'modalOff': {
      return {
        ...state,
        selectedRecord:{},
        main_image:"",
        show_image:"",
        visible: false,
        edit: false,
        bulk: false,
        load:false
      };
    }
    case 'modalOffAndTourUpdate': {
      return {
        ...state,
        selectedRecord:{},
        records:action.payload,
        main_image:"",
        show_image:"",
        visible: false,
        edit: false,
        bulk: false,
        load:false,
        show_images:[],
      };
    }
    default:
      return state;
  }
}

const baseValues = {
  title:"",
  availability:"Everyday",
  duration:"Upto 1 hour",
  destination:"",
  time_slot:"10:00 am",
  confirmation:"Instant",
  refund:"No",
  voucher:"Printed V-copy Accepted",
  lang:"English, Arabic",
  tour_detail:"",
  departure:"",
  reporting:"",

  child_price:"",
  adult_price:"",

  category:"Adventure",
  advCategory:"",
  city:"Dubai City",

  packageTravel:"",
  packageCountry:"",
  packageCity:"",
  packageDescription:"",
  cutOff:dayjs('12:08', format)
};

const initialState = {
  records:[],
  cities:[],
  selectedRecord:{},
  visible:false,
  bulk:false,
  edit:false,
  activeTab:'1',
  load:false,
  search:"",
  categorySearch:"",
  //form values
  values:baseValues,
  stock:0,
  main_image:"",
  show_image:"",

  prev_images:[],
  deleted_images:[],
  more_images:[],
  show_images:"",

  inclusion:"",
  inclusions:[],

  exclusion:"",
  exclusions:[],

  why_should:"",
  why_shoulds:[],

  imp_info:"",
  imp_infos:[],

  policy:"",
  policies:["In case Tours or Tickets cancelled after Booking 100 % charges will be applicable."],

  package:{ name:"", child_price:"0.00", adult_price:"0.00" },
  packages:[],

  cancellation_policy:"",
  cancellation_polices:["In case Tours or Tickets cancelled after Booking 100 % charges will be applicable."],

  term_condition:"",

  dated:false,
  dates:[],

  timeStart:'',
  timeEnd:'',

  timeStartWithDate:'',
  timeEndWithDate:'',

  minutes:0.0,

  timed:false,
  timeSlots:[],

  time:"",
  
  status:"",
  prevPrice:0,

  packageIncludes:{
    transport:0,
    food:0,
    plane:0,
    hotel:0,
    potography:0
  },
  packageDay:'',
  packageDetail:["Day One"]
};

export { initialState, reducerFunctions, baseValues }