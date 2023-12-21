import React from 'react'
import { Tabs, Card} from 'antd'
import { Flex } from 'antd';
import { Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../dictionary-alphabet/alphabet.css'
const { TabPane } = Tabs;

// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// import AllCategoryWords from '../all-category-words/allCategoryWords';
// import { Link } from 'react';
const CustomCard = ({ title, content }) => (
  <Card className='custom-card' title={title} style={{ width: 300 }}>
    <p className="custom-card-text">{content}</p>
  </Card>
);

const CustomAllCategoryCard = ({ content, subcontent }) => (
  <Card className='custom-card custom-all-category-card' content={content} subcontent={subcontent} style={{ width: 200 }}>
    <p className="cusom-card-title">{content}</p>
    <p className="cusom-card-subtitle">{subcontent}</p>
    <FontAwesomeIcon icon="fa-solid fa-bag-shopping" />

  </Card>
);

const AlphabetTab = () => {

    const alphabet = ['A', 'B', 'C', 'Ç', 'D', 'E', 'Ə', 'F', 'G', 'Ğ', 'H', 'X', 'I', 'İ', 'J', 'K', 'Q', 'L', 'M', 'N', 'O','Ö', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  return (
    <div className='body-margin'>
      <Tabs  style={{ justifyContent: 'center' }} defaultActiveKey="1">
        <TabPane id='all-categories-tab' tab="All Categories" key="1">
        <div >
            <Flex gap="small" vertical>
              <Row gutter={[16, 16]}>

              <Col key={1} xs={{ span: 12 }} sm={{ span: 8 }} md={{span: 8 }} lg={{ span: 4 }}>
                <a href="">
               
                </a>
                <a to="">
                <CustomAllCategoryCard content={'Shopping'} subcontent={'240 jest'} />
              </a>
              </Col>
               
              <Col key={2} xs={{ span:12 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 4 }}>
             <a href=""> <CustomAllCategoryCard content={'Countries'} subcontent={'240 jest'} /></a>
              </Col> 
                
              <Col key={3} xs={{ span: 12 }} sm={{ span:8  }} md={{span: 8  }} lg={{ span: 4 }}>
             <a href=""><CustomAllCategoryCard content={'Numbers'} subcontent={'240 jest'} /></a>
              
              </Col>
              
              <Col key={4} xs={{ span: 12 }} sm={{ span: 8 }} md={{ span: 8  }} lg={{ span: 4  }}>
             <a href=""> <CustomAllCategoryCard content={'Transportation'} subcontent={'240 jest'} /></a>
             
              </Col>
                

              <Col key={5} xs={{ span: 12 }} sm={{ span: 8 }} md={{span: 8 }} lg={{ span: 4  }}>
             <a href=""> <CustomAllCategoryCard content={'Food'} subcontent={'240 jest'} /></a>
             
              </Col>

              <Col key={5} xs={{ span: 12 }} sm={{ span: 8 }} md={{ span: 8  }} lg={{ span: 4 }}>
              <a href=""> <CustomAllCategoryCard content={'Technology'} subcontent={'240 jest'} /></a>
             
              </Col>

              <Col key={6} xs={{ span: 12 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 4  }}>
             <a href=""> <CustomAllCategoryCard content={'Work'} subcontent={'240 jest'} /></a>
             
              </Col>

              <Col key={7} xs={{ span: 12 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 4 }}>
             
             <a href=""><CustomAllCategoryCard content={'Animals'} subcontent={'240 jest'} /></a> 
              </Col>

              <Col key={8} xs={{ span: 12 }} sm={{ span: 8 }} md={{span: 8 }} lg={{ span: 4  }}>
            <a href=""><CustomAllCategoryCard content={'Professions'} subcontent={'240 jest'} /></a>
              
              </Col>

              <Col key={9} xs={{ span: 12 }} sm={{ span: 8 }} md={{span: 8 }} lg={{ span: 4 }}>
              <a href=""><CustomAllCategoryCard content={'Time'} subcontent={'240 jest'} /></a>
              
              </Col>
                
              </Row>
            </Flex>
          </div>

        </TabPane>
        
        <TabPane id='alphabet-tab' tab="Alphabet" key="2">
          <div >
            <Flex gap="small" vertical>
              <Row gutter={[16, 16]}>
                {alphabet.map((letter, index) => (
                  <Col key={index} xs={{ span: 12 }} sm={{ span: 8 }} md={{ span:  8}} lg={{ span: 3 }}>
                    <a href="">
                    <CustomCard  content={letter} />
                    </a>
                  </Col>
                ))}
              </Row>
            </Flex>
          </div>
        </TabPane>

        <TabPane id='configurations-tab' tab="Configurations" key="3">
          <div >
            <Flex gap="small" vertical>
              <Row gutter={[16, 16]}>
                {alphabet.map((letter, index) => (
                  <Col key={index} xs={{ span: 12 }} sm={{ span: 12 }} md={{ span:  8}} lg={{ span: 6 }}>
                    <a href="">
                    <CustomCard className="configurations-card" content="word" />
                    </a>
                  </Col>
                ))}
              </Row>
            </Flex>
          </div>
        </TabPane>

        <TabPane id='sentences-tab' tab="Sentences" key="4">
          <div >
            <Flex gap="small" vertical>
              <Row gutter={[16, 16]}>
                {alphabet.map((letter, index) => (
                  <Col key={index} xs={{ span: 12 }} sm={{ span: 12 }} md={{ span:  8}} lg={{ span: 6 }}>
                    <a href="">
                    <CustomCard className="sentences-card" content="word"/>
                    </a>
                  </Col>
                ))}
              </Row>
            </Flex>
          </div>
        </TabPane>
      </Tabs>
    </div>

  )
}

export default AlphabetTab;