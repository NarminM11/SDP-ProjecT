import React from 'react'

import { Tabs, Card} from 'antd'
import { Button, Flex, Radio, Slider } from 'antd';
import { Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import '../dictionary-alphabet/alphabet.css'



const CustomCountriesCard = ({  content }) => (
    <Card className='countries-custom-card' content={content} style={{ width: 300 }}>
      <p  style={{ color: 'black' }}>{content}</p>
    </Card>
  );
  

const AllCategoryWords = () => {
  return (

    <div >
    <Flex gap="small" vertical>
      <Row justify="center"  gutter={[16, 16]}>

      <Col  className='card-col' key={1} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
    <a href=""><CustomCountriesCard content={'word'} />  </a>
      </Col>
        
      <Col  className='card-col' key={2} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
     <a href=""> <CustomCountriesCard content={'word'} /> </a>
      </Col>
        
      <Col  className='card-col' key={3} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
          <a href="">  <CustomCountriesCard content={'word'} /></a>
    
      </Col>
        

      <Col className='card-col' key={4} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
    <a href=""> <CustomCountriesCard content={'word'} /></a>
     
      </Col>
        

      <Col className='card-col' key={5} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
     <a href=""> <CustomCountriesCard content={'word'} /></a>
     
      </Col>

      <Col className='card-col' key={5} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
     <a href=""> <CustomCountriesCard content={'word'} /></a>
     
      </Col>

      <Col className='card-col' key={6} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
    <a href="">   <CustomCountriesCard content={'word'} /></a>
   
      </Col>

      <Col className='card-col' key={7} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
      <a href=""> <CustomCountriesCard content={'word'} /></a>
     
      </Col>

      <Col className='card-col' key={8} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
    <a href="">   <CustomCountriesCard content={'word'} /></a>
   
      </Col>

      <Col className='card-col' key={9} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
     <a href=""><CustomCountriesCard content={'word'} /></a>
      
      </Col>
        
      </Row>
    </Flex>
  </div>



  )
}

export default AllCategoryWords
