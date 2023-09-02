import { useEditor, EditorContent } from '@tiptap/react';
import Paragraph from '@tiptap/extension-paragraph';
import React, { useEffect, useState } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { MailOutlined } from '@ant-design/icons';
import StarterKit from '@tiptap/starter-kit';
import { Modal, Input } from 'antd';
import axios from "axios";
import moment from "moment";
import Router from "next/router";

const CreateOffer = ({content, setContent, records, promos}) => {

  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [PromoId, setPromoId] = useState("");
  const partyDetail = { height:80, overflowY:'auto', padding:0 }
  const editor = useEditor({
    extensions: [
      StarterKit,
      Paragraph.configure({ HTMLAttributes:{
        style:'margin: 0px; margin-left: 5px;'
      }})
    ],
    content: content,
    onUpdate({ editor }) {
      setContent(editor.getHTML())
    },
  }, [])

  const NextStep = ({records, content, PromoId}) => {
    const [search, setSearch] = useState("");
    const [select, setSelect] = useState(false);
    const [customRecords, setCustomRecords] = useState([]);

    useEffect(() => {
      let tempRecords = [...records];
      tempRecords.forEach((x)=>{
        x.check=false
      })
      setCustomRecords(tempRecords);
    }, []);

    return(
      <>
      <Row>
        <Col md={3} className='pt-1'>
        <span style={{cursor:'pointer'}} 
          onClick={()=>{
            let tempRecords = [...customRecords];
            tempRecords.forEach((x)=>x.check=select?false:true)
            setCustomRecords(tempRecords)
            setSelect(select?false:true)
          }}>
          <input type='checkbox' checked={select} /><span style={{position:'relative', bottom:1}}> Select All</span>
        </span>
        </Col>
        <Col md={5}>
        <Input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search' />
        </Col>
      </Row>
      <hr/>
      <div className='table-sm-1' style={{maxHeight:"30vh", overflowY:'auto', overflowX:'hidden'}}>
      <Table className='tableFixHead'>
      <tbody>
      {customRecords.filter((x)=>{ 
        if(x.name.toLowerCase().includes(search.toLowerCase()) || x.email.toLowerCase().includes(search.toLowerCase())){
          return x
        }else if(search==""){
          return x
        }
      }).map((x,i) => {
      return (
      <tr key={i} className='my-0 py-0 row-hov'
        onClick={()=>{
          let tempRecords = [...customRecords];
          let index = tempRecords.findIndex((y) => y.id == x.id);
          tempRecords[index].check = !tempRecords[index].check;
          setCustomRecords(tempRecords);
      }}>
        <td className='fs-16 pt-3' style={{maxWidth:30}}>
            <img src={x.image} style={{borderRadius:"100%", position:'relative', bottom:7}}  height={40}  alt="Offer"/>
        </td>
        <td>
          <span className='mx-2'>{x.name}</span><br/>
          <MailOutlined style={{position:'relative', bottom:3}} className='mx-2' />{x.email}
        </td>
        <td className='pt-4'>
          <input type='checkbox' checked={x.check}  />
        </td>
      </tr>
      )})}
      </tbody>
      </Table>
      </div>
      <div><button className='btn-custom'
        onClick={async()=>{
          let tempRecords = [];
          tempRecords = customRecords.filter((x)=>x.check==true).map((x)=> { return {CustomerId:x.id, email:x.email, name:x.name, PromoId:PromoId} })
          await axios.post(process.env.NEXT_PUBLIC_POST_SEND_OFFER,{
            content,
            list:tempRecords
          }).then((x)=>{
            if(x.data.status=="success"){
              Router.push("/customers");
            } else{
              openNotification("Error", "Something Went Wrong", "orange")
            }
            //console.log(x.data);
          })
          // console.log(content);
          // console.log(customRecords);
        }}
      >Send</button></div>
      </>
    )
  }

return(
  <>
  <div className='mb-2'>Content</div>
    <div style={{border:'1px solid black'}}>
      <EditorContent editor={editor} style={partyDetail} />
    </div>
    <hr/>
    <div className='mb-1'>Select promo</div>
    <Input className='mb-2' value={search} onChange={(e)=>setSearch(e.target.value)} style={{width:130}} placeholder='Search Promo' />
    <div className='table-sm-1' style={{maxHeight:"20vh", overflowY:'auto', overflowX:'hidden'}}>
      <Table className='tableFixHead'>
      <tbody>
      {promos.filter((x)=>{ 
        if(x.name.toLowerCase().includes(search.toLowerCase()) || x.code.toLowerCase().includes(search.toLowerCase())){
          return x
        }else if(search==""){
          return x
        }
      }).map((x,i) => {
      return (
      <tr key={i} className={`my-0 py-0 row-hov ${x.id==PromoId?'row-selected':''}`}
        onClick={()=>setPromoId(x.id)}>
        <td className='fs-16 pt-2' >{x.name}
        </td>
        <td className='fs-16 pt-2'>{x.code}</td>
        <td className='pt-2'>
          Expiry: <b>{moment(x.validity).fromNow()}</b>
        </td>
      </tr>
      )})}
      </tbody>
      </Table>
    </div>
    <div className='pt-3'>
      <button className='btn-custom' onClick={()=>setVisible(true)}>Next</button>
    </div>
    <Modal
      title="Select Customers"
      centered
      open={visible}
      onOk={()=>setVisible(false)} onCancel={()=>setVisible(false)}
      width={500} footer={false} 
    >{visible && <NextStep content={content} records={records} PromoId={PromoId} />}
    </Modal>
  </>
)}

export default CreateOffer