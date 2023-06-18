import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Paragraph from '@tiptap/extension-paragraph';
import { Modal, Input } from 'antd';
import { Table, Row, Col } from 'react-bootstrap';
import { MailOutlined } from '@ant-design/icons';

const CreateOffer = ({content, setContent, records}) => {

  const [select, setSelect] = useState(false);
  const [visible, setVisible] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Paragraph.configure({ HTMLAttributes:{ class:'my-custom-paragraph'} })
    ],
    content: content,
    onUpdate({ editor }) {
      setContent(editor.getHTML())
    },
  }, [])

  const partyDetail = { height:80, overflowY:'auto', padding:0 }

  const NextStep = ({records}) => {

    const [search, setSearch] = useState("");
    const [select, setSelect] = useState(false);
    const [customRecords, setCustomRecords] = useState([])
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
      <div className='table-sm-1' style={{maxHeight:"60vh", overflowY:'auto', overflowX:'hidden'}}>
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
          tempRecords[i].check = !tempRecords[i].check;
          setCustomRecords(tempRecords);
      }}>
        <td className='fs-16 pt-3' style={{maxWidth:30}}>
            <img src={x.image} style={{borderRadius:"100%", position:'relative', bottom:7}}  height={40} />
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
      <div><button className='btn-custom'>Send</button></div>
      </>
    )
  }

return(
  <div>
    <div style={{border:'1px solid black'}}>
      <EditorContent editor={editor} style={partyDetail} />
    </div>
    <div className='pt-3'>
      <button className='btn-custom' onClick={()=>setVisible(true)}>Next</button>
    </div>
    <Modal
      title="Select Customers"
      open={visible}
      onOk={()=>setVisible(false)} onCancel={()=>setVisible(false)}
      width={500} footer={false} 
    >{visible && <NextStep records={records} />}
    </Modal>
  </div>
)}

export default CreateOffer