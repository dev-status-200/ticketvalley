import React, {useEffect, useState} from 'react';
import Desktop from './Desktop';
import Mobile from './Mobile';
import axios from 'axios';

const Home = () => {

  const [bestSelling, setBestSelling] = useState([])
  const [adventures, setAdventures] = useState([])
  const [combos, setCombos] = useState([])

  useEffect(() => {
      getData();
  }, [])

  const getData = async() => {
        await axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_ADV_CATEGORY,{
          headers:{ "category": "Best Selling" }
        }).then((x)=>{
          setBestSelling(x.data.result);
          axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_ADV_CATEGORY,{
              headers:{ "category": "Adventure Tours" }
            }).then((x)=>{
              setAdventures(x.data.result);
              axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_ADV_CATEGORY,{
                  headers:{ "category": "Combo Tours" }
                }).then((x)=>setCombos(x.data.result))
          })
      })
  }
  return (
    <div className=''>
    <div className="desktop" >
        <Desktop bestSelling={bestSelling} adventures={adventures} combos={combos} />
    </div>
    <div className="mobile" >
        <Mobile bestSelling={bestSelling} adventures={adventures} combos={combos} />
    </div>
    </div>
  )
}

export default Home