import Layout from "../components/Layout/layout";
import "../assets/faq.css";
import React, { useState } from "react";
import "../assets/faq.css";
import { Col, Row } from "antd";
import { Collapse } from "antd";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items = [
  {
    key: "1",
    label: "Necə qeydiyyatdan keçmək olar? ",
    children: <p className="faq-text">Qeyd bölməsində sadə bir qeydiyyatdan keçə bilərsiniz</p>,
  },
  {
    key: "2",
    label: "Sözü necə tapmaq olar? ",
    children: <p className="faq-text">Axtarışda sözü yazın, sonra nəticə göstəriləcək.</p>,
  },
  {
    key: "3",
    label: "Sözü şəxsi lüğətə necə əlavə etmək olar? ",
    children: <p className="faq-text">Yalnız qeydiyyatdan keçmiş istifadəçilər videonun altında "Lüğətə əlavə edin" düyməsini klikləyə bilər  </p>,
  },
  {
    key: "4",
    label: "Sual vermək üçün sizinlə necə əlaqə saxlaya bilərəm? ",
    children: <p className="faq-text">Əlaqə bölməsində bütün məlumatlar var.</p>,
  }, 

//   {
//     key: "5",
//     label: "This is panel header 2",
//     children: <p>{text}</p>,
//   },
//   {
//     key: "6",
//     label: "This is panel header 3",
//     children: <p>{text}</p>,
//   },
];

const Faq = () => {
  const [activeKey, setActiveKey] = useState(null);

  const handlePanelChange = (key) => {
    setActiveKey(key === activeKey ? null : key);
  };

  return (
    <Layout>
      <>
      <div className="container-for-all">
      <div className="head-faq">
          <h1 className="title-faq mt-5">Tez-tez soruşulan suallar</h1>
          {/* <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor
            ut labore et dolore magna aliqua.
          </p> */}
        </div>

        <div className="container-faq">
          <div className="faqPage">
            <div className="faq-accordion-container">
              <Row>
                <Col span={12}>
                  <Collapse
                    accordion
                    activeKey={activeKey}
                    onChange={(key) => handlePanelChange(key)}
                  >
                    {items.slice(0, 2).map((item) => (
                      <Collapse.Panel header={item.label} key={item.key}>
                        {item.children}
                      </Collapse.Panel>
                    ))}
                  </Collapse>
                </Col>

                <Col span={12}>
                  <Collapse
                    accordion
                    activeKey={activeKey}
                    onChange={(key) => handlePanelChange(key)}
                  >
                    {items.slice(2).map((item) => (
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

        </div>
      
      </>
    </Layout>
  );
};

export default Faq;