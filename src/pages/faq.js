import React, { useState } from "react";
import FaqElements from "../components/faqElements";
import "../assets/faq.css";
import { Col, Row } from 'antd';
import { Collapse } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  },
  {
    key: '4',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    key: '5',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '6',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  }
];

const FAQ = () => {

  const [activeKey, setActiveKey] = useState(null);

  const handlePanelChange = (key) => {
    setActiveKey(key === activeKey ? null : key);
  };
  return (
    <>

    
      <div className="head">
        <h1 className="title">Frequently Asked Questions</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut
          labore et dolore magna aliqua.
        </p>
      </div>


        <div className="container">
        <div className="faqPage">
          <div className="elementsContainer">
            <Row>
              {/* Left side with the first three FAQ items */}
              <Col span={12}>
                <Collapse
                  accordion
                  activeKey={activeKey}
                  onChange={(key) => handlePanelChange(key)}
                >
                  {items.slice(0, 3).map(item => (
                    <Collapse.Panel header={item.label} key={item.key}>
                      {item.children}
                    </Collapse.Panel>
                  ))}
                </Collapse>
              </Col>

              {/* Right side with the remaining three FAQ items */}
              <Col span={12}>
                <Collapse
                  accordion
                  activeKey={activeKey}
                  onChange={(key) => handlePanelChange(key)}
                >
                  {items.slice(3).map(item => (
                    <Collapse.Panel header={item.label} key={item.key}>
                      {item.children}
                    </Collapse.Panel>
                  ))}
                </Collapse>
              </Col>
            </Row>
          </div>
        </div>
      </div>


     
    </>
  );
};

export default FAQ;
