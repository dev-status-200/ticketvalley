function reducerFunctions(state, action) {
    switch (action.type) {
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
        };
      }
      default:
        return state;
    }

}

const baseValues = {

  title:"",
  availability:"",
  duration:"",
  time_slot:"",
  transport:"",
  confirmation:"",
  refund:"",
  voucher:"",
  lang:"",
  tour_detail:"",
  departure:"",
  reporting:"",
  
  child_price:"",
  adult_price:"",

  category:"",
  stock:"",
  transportType:"",
}

const initialState = {
    records:[],
    selectedRecord:{},
    visible:false,
    edit:false,
    activeTab:'1',
    load:false,
    search:"",
    //form values
    values:baseValues,
    transportData:[],
    main_image:"",
    show_image:"",

    prev_images:[],
    deleted_images:[],
    more_images:[],
    show_images:"",

    inclusion:"",
    inclusions:[],

    why_should:"",
    why_shoulds:[],

    imp_info:"",
    imp_infos:[],

    policy:"",
    policies:[],

    cancellation_policy:"",
    cancellation_polices:[],

    term_condition:"",
    terms_conditions:[],
    
    status:""
};

export { initialState, reducerFunctions, baseValues }