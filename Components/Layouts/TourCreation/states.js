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
          visible: false,
          edit: false,
        };
      }
      default:
        return state;
    }

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
    show_image:"",
    show_images:"",
    main_image:"",
    more_images:[],
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
    inclusion:"",
    inclusions:[],
    why_should:"",
    why_shoulds:[],
    price:"",
    departure:"",
    reporting:"",
    meals:"",
    imp_info:"",
    imp_infos:[],
    policy:"",
    policies:[],
    product_category:"",
    tour_category:""
};

export { initialState, reducerFunctions }