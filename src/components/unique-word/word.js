import React from 'react'
import { Col, Row } from 'antd';
import { Card } from 'antd';
import { Flex} from 'antd';
import {  Button, Space, Dropdown, Menu } from 'antd';
import { HeartOutlined, SaveOutlined, RocketOutlined, DownloadOutlined } from '@ant-design/icons';

import '../unique-word/uniqueWord.css'


const { Meta } = Card;



const CustomCountriesCard = ({  content }) => (
    <Card className='countries-custom-card' content={content} style={{ width: 300 }}>
      <p  style={{ color: 'black' }}>{content}</p>
    </Card>
  );
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
  ];

  

const word = () => {
  const menu = (
    <Menu >
      {items.map(item => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  ); 
  return (
    <>
   
    <Row style={{display:"flex" , justifyContent:"center"}}>
      <Col style={{display:"flex" , justifyContent:"center",width: 240}} span={6}>
            <Card 
            hoverable
            style={{ width: 300 }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
           <div style={{display:"flex"}}>
           <Button type="primary" style={{ marginRight: "34px" }}><DownloadOutlined /> Download File </Button>
            <Space>
            <Button type="default" icon={<SaveOutlined />} /> {/* Save */}
            <Button type="default" icon={<HeartOutlined />} /> {/* Like (Heart) */}
           
        
   
                  
        </Space>
           </div>
        </Card>
      </Col>
      <Col span={6}>
      <Card id="unique-word-def" style={{ textAlign: "center" }} title="WORD" bordered={false}>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste commodi necessitatibus eaque temporibus a unde sit laborum vitae enim qui possimus eius, quibusdam, nisi quos voluptatum similique dicta, optio atque dolor consectetur dignissimos ducimus placeat magni? Sed et, similique possimus dignissimos soluta, doloribus reprehenderit hic rerum laboriosam tempore, vel iste quos perspiciatis ab reiciendis a quidem sequi nemo qui fugit voluptas dolore? Perferendis minima tenetur labore ut ea culpa sint, praesentium quod alias deserunt consectetur iste ex nihil, rerum voluptatum necessitatibus, illo quasi modi? Magni est expedita, corporis officia earum suscipit itaque, enim deserunt quaerat deleniti consequatur excepturi natus veniam!
      </Card>
      </Col>
      <Col span={6}>

       <p style={{textAlign:"center", fontSize:"15px", color: "#2b2676"}}><b >Relevant Words</b></p> 
         <div style={{ height: '400px', overflowY: 'auto', overflowX: 'hidden' }}>
            <Flex gap="small" vertical>
              <Row justify="center"  gutter={[16, 16]}>

              <Col  className='card-col' key={1} xs={{ span: 24 }}  >
            <a href=""><CustomCountriesCard content={'word'} />  </a>
              </Col>
                
              <Col  className='card-col' key={2} xs={{ span: 24 }}>
             <a href=""> <CustomCountriesCard content={'word'} /> </a>
              </Col>
                
              <Col  className='card-col' key={3} xs={{ span: 24 }}>
                  <a href="">  <CustomCountriesCard content={'word'} /></a>
            
              </Col>
                

              <Col className='card-col' key={4} xs={{ span: 24 }} >
            <a href=""> <CustomCountriesCard content={'word'} /></a>
             
              </Col>
                

              <Col className='card-col' key={5} xs={{ span: 24 }} >
             <a href=""> <CustomCountriesCard content={'word'} /></a>
             
              </Col>

              <Col className='card-col' key={5} xs={{ span: 24 }} >
             <a href=""> <CustomCountriesCard content={'word'} /></a>
             
              </Col>

              <Col className='card-col' key={6} xs={{ span: 24 }}>
            <a href="">   <CustomCountriesCard content={'word'} /></a>
           
              </Col>

         
              </Row>
            </Flex>
          </div>


      </Col>
    </Row>
    
  </>
  )
}

export default word
