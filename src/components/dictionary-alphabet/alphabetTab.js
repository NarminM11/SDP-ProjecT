import React from 'react'
import { Tabs, Card} from 'antd'
import { Button, Flex, Radio, Slider } from 'antd';
import { Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import '../dictionary-alphabet/alphabet.css'
const { TabPane } = Tabs;


const CustomCard = ({ title, content }) => (
  <Card className='custom-card' title={title} style={{ width: 300 }}>
    <p className="custom-card-text">{content}</p>
  </Card>
);



const CustomCountriesCard = ({  content }) => (
  <Card className='countries-custom-card' content={content} style={{ width: 300 }}>
    <p  style={{ color: 'black' }}>{content}</p>
  </Card>
);

const CustomAllCategoryCard = ({ content, subcontent }) => (
  <Card className='custom-card custom-all-category-card' content={content} subcontent={subcontent} style={{ width: 300 }}>
    <p className="cusom-card-title">{content}</p>
    <p className="cusom-card-subtitle">{subcontent}</p>
    <FontAwesomeIcon icon="fa-solid fa-bag-shopping" />

  </Card>
);

const AlphabetTab = () => {
    const [gapSize, setGapSize] = React.useState('small');
    const [customGapSize, setCustomGapSize] = React.useState(0);
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  return (
<div className='body-margin'>
   
     
     
      <Tabs  style={{ justifyContent: 'center' }} defaultActiveKey="1">
        <TabPane id='all-categories-tab' tab="All Categories" key="1">
        <div style={{ height: '400px', overflowY: 'auto', overflowX: 'hidden' }}>
            <Flex gap="small" vertical>
              <Row gutter={[16, 16]}>
              <Col key={1} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                 <CustomAllCategoryCard content={'Shopping'} subcontent={'240 jest'} />
              </Col>
                
              <Col key={2} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <CustomAllCategoryCard content={'Countries'} subcontent={'240 jest'} />
              </Col>
                
              <Col key={3} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <CustomAllCategoryCard content={'Numbers'} subcontent={'240 jest'} />
              </Col>
                

              <Col key={4} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <CustomAllCategoryCard content={'Transportation'} subcontent={'240 jest'} />
              </Col>
                

              <Col key={5} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <CustomAllCategoryCard content={'Food'} subcontent={'240 jest'} />
              </Col>

              <Col key={5} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <CustomAllCategoryCard content={'Technology'} subcontent={'240 jest'} />
              </Col>

              <Col key={6} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <CustomAllCategoryCard content={'Work'} subcontent={'240 jest'} />
              </Col>

              <Col key={7} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <CustomAllCategoryCard content={'Animals'} subcontent={'240 jest'} />
              </Col>

              <Col key={8} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <CustomAllCategoryCard content={'Professions'} subcontent={'240 jest'} />
              </Col>

              <Col key={9} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <CustomAllCategoryCard content={'Time'} subcontent={'240 jest'} />
              </Col>
                
              </Row>
            </Flex>
          </div>

        </TabPane>
        
        <TabPane id='alphabet-tab' tab="Alphabet" key="2">
          <div style={{ height: '400px', overflowY: 'auto', overflowX: 'hidden' }}>
            <Flex gap="small" vertical>
              <Row gutter={[16, 16]}>
                {alphabet.map((letter, index) => (
                  <Col key={index} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                    <CustomCard  content={letter} />
                  </Col>
                ))}
              </Row>
            </Flex>
          </div>
        </TabPane>
       

        <TabPane id='countries-tab' tab="Countries" key="3">
        <div style={{ height: '400px', overflowY: 'auto', overflowX: 'hidden' }}>
            <Flex gap="small" vertical>
              <Row justify="center"  gutter={[16, 16]}>
              <Col  className='card-col' key={1} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
            <CustomCountriesCard content={'word'} />
              </Col>
                
              <Col  className='card-col' key={2} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
              <CustomCountriesCard content={'word'} />
              </Col>
                
              <Col  className='card-col' key={3} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
              <CustomCountriesCard content={'word'} />
              </Col>
                

              <Col className='card-col' key={4} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
              <CustomCountriesCard content={'word'} />
              </Col>
                

              <Col className='card-col' key={5} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
              <CustomCountriesCard content={'word'} />
              </Col>

              <Col className='card-col' key={5} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
              <CustomCountriesCard content={'word'} />
              </Col>

              <Col className='card-col' key={6} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
              <CustomCountriesCard content={'word'} />
              </Col>

              <Col className='card-col' key={7} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
              <CustomCountriesCard content={'word'} />
              </Col>

              <Col className='card-col' key={8} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
              <CustomCountriesCard content={'word'} />
              </Col>

              <Col className='card-col' key={9} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
              <CustomCountriesCard content={'word'} />
              </Col>
                
              </Row>
            </Flex>
          </div>

        </TabPane>

        <TabPane tab="Numbers" key="4">
        <CustomCard  content="Content for Tab 6" />


        </TabPane>
        <TabPane tab="Food" key="5">
          <CustomCard  content="Content for Tab 6" />
        </TabPane>

        <TabPane tab="Transportation" key="6">
          <CustomCard  content="Content for Tab 7" />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default AlphabetTab;
