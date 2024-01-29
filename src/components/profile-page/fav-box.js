import React, { useState, useEffect, createRef, useRef  } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { Col, Row, Button, Form, Input, message, Space } from "antd";
import axios from "axios";




const FavBox = () => {

   
    const [accessTokenValue, setAccessTokenValue] = useState("");
    const [favoriteWords, setFavoriteWords] = useState([]);
    const [favoriteSentences, setFavoriteSentences] = useState([]);
    
    const fetchFavoriteWords = async () => {
        const token = localStorage.getItem("user-info");
        const tokenObject = JSON.parse(token);
        const accessTokenValue = tokenObject.access_token;
    
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
    
          setFavoriteWords(wordsResponse.data.words);
          setFavoriteSentences(sentencesResponse.data.sentences);
        } catch (error) {
          console.error("Error fetching favorite words/sentences:", error);
        }
      };

      useEffect(() => {
        fetchFavoriteWords();
      }, []);
      

    return(
        <div>
        {(!favoriteWords || favoriteWords.length === 0) &&
            (!favoriteSentences || favoriteSentences.length === 0) ? (
              <Col
                className="first-frame empty-favorites"
                xs={24}
                md={24}
                lg={24}
                xl={14}
              >
                <p className="edit-details">
                  <FontAwesomeIcon icon={farHeart} /> My Favorite Words & Sentences
                </p>
                <h4 className="profile-heading">
                  You don't have any favorite words or sentences yet.
                </h4>
              </Col>
            ) : (
              <React.Fragment >
              {/* Display favorite words */}
                {favoriteWords && favoriteWords.length > 0 && (
                  <Col
                    className="first-framee"
                    xs={24}
                    md={24}
                    lg={12}
                    xl={14}
                  ></Col>
                )}
        
                {/* Display favorite sentences */}
                {favoriteSentences && favoriteSentences.length > 0 && (
                  <Col
                    className="second-framee"
                    xs={24}
                    md={24}
                    lg={12}
                    xl={14}
                  ></Col>
                )}
              </React.Fragment>
            )}
            </div>
    )
} 


export default FavBox;