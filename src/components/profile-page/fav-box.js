import React, { useState, useEffect, createRef, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as farHeart,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { Col, Row, Button, Modal, Tabs, Card } from "antd";
import axios from "axios";
import { Table } from "antd";
import { Link } from "react-router-dom";

const { TabPane } = Tabs;

const FavBox = () => {
  const [accessTokenValue, setAccessTokenValue] = useState("");
  const [favoriteWords, setFavoriteWords] = useState([]);
  const [favoriteSentences, setFavoriteSentences] = useState([]);
  const [token, setToken] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteItemType, setDeleteItemType] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const containerStyle = {
    maxHeight: "500px",
    overflowY: "auto",
  };
  const showDeleteModal = (itemId, itemType) => {
    setDeleteItemId(itemId);
    setDeleteItemType(itemType);
    setIsDeleteModalVisible(true);
  };


  const deleteItem = async () => {
    try {
      if (deleteItemType === 'word') {
        await axios.post(
          `https://morning-plains-82582-f0e7c891044c.herokuapp.com/learnLaterWordToggle/${deleteItemId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (deleteItemType === 'sentence') {
        await axios.post(
          `https://morning-plains-82582-f0e7c891044c.herokuapp.com/learnLaterSentenceToggle/${deleteItemId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // Update the local state to remove the deleted item
      if (deleteItemType === 'word') {
        setFavoriteWords((prevWords) =>
          prevWords.filter((word) => word.id !== deleteItemId)
        );
      } else if (deleteItemType === 'sentence') {
        setFavoriteSentences((prevSentences) =>
          prevSentences.filter((sentence) => sentence.id !== deleteItemId)
        );
      }

      setIsDeleteModalVisible(false); // Close the modal after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  
  

  const fetchFavoriteWords = async () => {
    const token = localStorage.getItem("user-info");
    const tokenObject = JSON.parse(token);
    const accessTokenValue = tokenObject.access_token;
    setToken(accessTokenValue);

    try {
      const wordsResponse = await axios.get(
        "https://morning-plains-82582-f0e7c891044c.herokuapp.com/learnLaterWords",
        {
          headers: {
            Authorization: `Bearer ${accessTokenValue}`,
          },
        }
      );
      console.log("Words Response:", wordsResponse);

      const sentencesResponse = await axios.get(
        "https://morning-plains-82582-f0e7c891044c.herokuapp.com/learnLaterSentences",
        {
          headers: {
            Authorization: `Bearer ${accessTokenValue}`,
          },
        }
      );
      console.log(wordsResponse);
      console.log(wordsResponse);

      setFavoriteWords(wordsResponse.data);
      setFavoriteSentences(sentencesResponse.data);
    } catch (error) {
      console.error("Error fetching favorite words/sentences:", error);
    }
  };

  useEffect(() => {
    fetchFavoriteWords();
  }, []);

  useEffect(() => {
    // Save favoriteWords and favoriteSentences to local storage
    localStorage.setItem("favoriteWords", JSON.stringify(favoriteWords));
    localStorage.setItem("favoriteSentences", JSON.stringify(favoriteSentences));
  }, [favoriteWords, favoriteSentences]);

  useEffect(() => {
    const storedFavoriteWords = localStorage.getItem("favoriteWords");
    const storedFavoriteSentences = localStorage.getItem("favoriteSentences");

    if (storedFavoriteWords) {
      setFavoriteWords(JSON.parse(storedFavoriteWords));
    }

    if (storedFavoriteSentences) {
      setFavoriteSentences(JSON.parse(storedFavoriteSentences));
    }
  }, []);

  const columns = [
    {
      title: "No",
      dataIndex: "wordNumber",
      key: "wordNumber",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Söz",
      dataIndex: "word_name",
      key: "word_name",
      render: (text, record) => (
        <Link to={`/category/${record.category_id}/words/${record.id}`}>
          {text}
        </Link>
      ),
    },
    // {
    //   title: 'Əməliyyatlar',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Button type="text" danger icon={<DeleteOutlined />} />
    //     </Space>
    //   ),
    // },
  ];

  const columns2 = [
    {
      title: "No",
      dataIndex: "wordNumber",
      key: "wordNumber",
      render: (text, record, index) => index + 1,
    },

    {
      title: "Cümlə",
      dataIndex: "text",
      key: "text",
      render: (text, record) => (
        <Link to={`/sentences/${record.id}`}>{text}</Link>
      ),
    },
    // {
    //   title: 'Əməliyyatlar',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Button type="text" danger icon={<DeleteOutlined />} />
    //     </Space>
    //   ),
    // }
  ];
  const renderWordCard = (record) => (
    <Card
      key={record.id}
      title={`Söz ${record.wordNumber}`}
      extra={
        <div>
          <Link to={`/words/${record.id}`}>Details</Link>
          <Button
            type="link"
            icon={<FontAwesomeIcon icon={faTrashAlt} />}
            onClick={() => showDeleteModal(record.id, "word")}
          />
        </div>
      }
      style={{ margin: "10px 0" }}
    >
      {record.word_name}
    </Card>
  );

  const renderSentenceCard = (record) => (
    <Card
      key={record.id}
      title={`Cümlə ${record.wordNumber}`}
      extra={
        <div>
          <Link to={`/sentences/${record.id}`}>Details</Link>
          <Button
            type="link"
            icon={<FontAwesomeIcon icon={faTrashAlt} />}
            onClick={() => showDeleteModal(record.id, "sentence")}
          />
        </div>
      }
      style={{ margin: "10px 0" }}
    >
      {record.text}
    </Card>
  );
  return (
    <div className="fav-container" style={containerStyle}>
      {!favoriteWords.length && !favoriteSentences.length ? (
        <Col
          className="first-frame-empty-favorites"
          xs={24}
          md={24}
          lg={24}
          xl={24}
        >
          <p className="fav-edit-details">
            <FontAwesomeIcon icon={farHeart} />
            Ən Sevdiyim Sözlər və Cümlələr
          </p>
          <h4 className="fav-profile-heading">
            Hələ sevimli söz və ya cümlələriniz yoxdur.{" "}
          </h4>
        </Col>
      ) : (
        <Row className="fav-first-frame-all" gutter={16}>
          <Col xs={24} lg={12}>
            {favoriteWords.length > 0 && (
              <Tabs defaultActiveKey="1">
                <TabPane tab="Sevimli Sözlər" key="1">
                  {favoriteWords.map((word) => renderWordCard(word))}
                </TabPane>
              </Tabs>
            )}
          </Col>
          <Col xs={24} lg={12}>
            {favoriteSentences.length > 0 && (
              <Tabs defaultActiveKey="2">
                <TabPane tab="Sevimli Cümlələr" key="2">
                  {favoriteSentences.map((sentence) =>
                    renderSentenceCard(sentence)
                  )}
                </TabPane>
              </Tabs>
            )}
          </Col>
        </Row>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        title="Silməyi təsdiqləyin"
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onOk={deleteItem} 
        okText="Sil"
        cancelText="Ləğv et"
      >
        <p>Bu elementi silmək istədiyinizə əminsiniz?</p>
      </Modal>
    </div>
  );
};

export default FavBox;
