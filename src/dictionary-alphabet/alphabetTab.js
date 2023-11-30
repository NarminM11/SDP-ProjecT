import React from 'react'
import { Tabs, Card} from 'antd'
import { Button, Flex, Radio, Slider } from 'antd';
import { Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
const { TabPane } = Tabs;


const CustomCard = ({ title, content }) => (
  <Card title={title} style={{ width: 300 }}>
    <p>{content}</p>
  </Card>
);

const AlphabetTab = () => {
    const [gapSize, setGapSize] = React.useState('small');
    const [customGapSize, setCustomGapSize] = React.useState(0);
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  return (
<div>
   
     
     
      <Tabs defaultActiveKey="1">
        <TabPane tab="All Categories" key="1">
        <div style={{ height: '300px', overflowY: 'auto', overflowX: 'hidden' }}>
            <Flex gap="small" vertical>
              <Row gutter={[16, 16]}>
              <Col key={1} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <Card  bordered={false}>
             <p> Shopping </p><faCoffee></faCoffee>
                </Card>
              </Col>
                
              <Col key={1} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <Card  bordered={false}>
             <p> Countries</p>
                </Card>
              </Col>
                
              <Col key={1} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <Card  bordered={false}>
             <p> Numbers</p>
                </Card>
              </Col>
                

              <Col key={1} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <Card  bordered={false}>
             <p> Transportation</p>
                </Card>
              </Col>
                

              <Col key={1} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <Card  bordered={false}>
             <p> Food</p>
                </Card>
              </Col>

              <Col key={1} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <Card  bordered={false}>
             <p> Technology</p>
                </Card>
              </Col>

              <Col key={1} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <Card  bordered={false}>
             <p> Work</p>
                </Card>
              </Col>

              <Col key={1} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <Card  bordered={false}>
                <p> Animals</p>

                </Card>
              </Col>

              <Col key={1} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <Card  bordered={false}>
             <p> Professions</p>
                </Card>
              </Col>

              <Col key={1} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <Card  bordered={false}>
             <p> Time</p>
                </Card>
              </Col>
                
              </Row>
            </Flex>
          </div>

        </TabPane>
        
        <TabPane tab="Alphabet" key="2">
          <div style={{ height: '300px', overflowY: 'auto', overflowX: 'hidden' }}>
            <Flex gap="small" vertical>
              <Row gutter={[16, 16]}>
                {alphabet.map((letter, index) => (
                  <Col key={index} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                    <CustomCard content={letter} />
                  </Col>
                ))}
              </Row>
            </Flex>
          </div>
        </TabPane>
       

        <TabPane tab="Countries" key="3">
        <Flex gap="small" vertical>
            <Flex gap={gapSize !== 'customize' ? gapSize : customGapSize}>
            <CustomCard  content="I" />
                <CustomCard  content="G" />
                <CustomCard  content="K" />
                <CustomCard  content="L" />
              

             </Flex>
        </Flex>
        </TabPane>

        <TabPane tab="Numbers" key="4">
        <CustomCard  content="M" />
                <CustomCard  content="N" />
                <CustomCard  content="O" />
                <CustomCard  content="P" />
                <CustomCard  content="S" />


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
