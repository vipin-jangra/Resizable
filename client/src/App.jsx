import { useState, useEffect } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import techImage from './assets/tech.jpg';
import "./App.css";
import { Count, addArticle, getLatestArticle, updateArticle } from './apicalls/articles';
import {message} from 'antd'
const App = () => {
  const [showUpdateDiv, setShowUpdateDiv] = useState(false);
  const [updatedArticle, setUpdatedArticle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [latestArticle, setLatestArticle] = useState(null);
  const [data, setData] = useState({ '_id': 'your_article_id' });
  const [counts,setCounts] = useState({});

  useEffect(() => {
    
    fetchLatestArticle();
    handleCounts();
  }, []);

  const handleCounts = async()=>{
    try {
      const response = await Count();
      setCounts(response.data);
    } catch (error) {
      console.error('Error fetching count :', error);
    }
  };

  const fetchLatestArticle = async () => {
    try {
      const response = await getLatestArticle(); 
      if (response.success) {
        setLatestArticle(response.data.article);
        setUpdatedArticle(response.data.article); 
        setData(response.data)
      }
    } catch (error) {
      console.error('Error fetching latest article:', error);
      
    }
  };

  

  const handleAddArticle = async () => {
    try {
      const data ={
        article : articleContent
      };
      const response = await addArticle(data);
      if(response.success){
        message.success(response.message);
        fetchLatestArticle();
        handleCounts();
        setArticleContent('');
      }else{
        message.error(response.message);
      }
     
    } catch (error) {
      console.error('Error adding article:', error);
      
    }
  };

  const handleUpdate = async() =>{
    try {
      const payloadData ={
        _id : data._id,
        article : updatedArticle
      };
      const response = await updateArticle(payloadData);
      if(response.success){
        message.success(response.message);
        fetchLatestArticle();
        setShowUpdateDiv(false);
        handleCounts();
      }else{
        message.error(response.message);
      }
     
    } catch (error) {
      console.error('Error updating article:', error);
      
    }
  }

  return (
    <div className="main">
      <PanelGroup className="panel-group" direction="vertical">
        
        <Panel  maxSize={100} >
            <PanelGroup direction="horizontal">
              <Panel className="panel" defaultSize={40}>
  
                <div className="information">
                  <span className="tag">Feature</span>
                  <h2 className="title">Never miss your important meetings</h2>
                  <p className="info">Elemenatary tracks all the events for the day as you scheduled and you will never have to worry.</p>
                  <button className="button">
                    <span>Learn more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" fill="currentColor" />
                    </svg>
                  </button>
                </div>
                
              </Panel>
              <PanelResizeHandle className="panel-col-resize-handle" ><i className="ri-expand-left-right-line" ></i></PanelResizeHandle>
              <Panel className="panel">
                <div className="main-div-content">
                  <div className="product-details">
      
                    <h2>{latestArticle ?? "Lorem Ipsum"}</h2>
        
                    <p className="info"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
    
          
                  </div>

                  <div className="product-image">
    
                    <img
                        src={techImage}
                        alt="Description of the image"
                      />
                  </div>
                  
                </div>
              </Panel>
            </PanelGroup>
        </Panel>
        
        <PanelResizeHandle className="panel-resize-handle" ><i className="ri-expand-up-down-line" ></i></PanelResizeHandle>
        
        <Panel className="panel" maxSize={100}>
        <div className="text-div">
          <div className="title-div text-white justify-center">
            <h1>WRITE YOUR LATEST TECHNICAL ARTICLE HERE ...</h1>
            <label >
              <textarea className="text-area" value={articleContent}  placeholder="type here...." name="postContent"  onChange={(e)=> setArticleContent(e.target.value)}/>
            </label>
            <button className="action-button" onClick={handleAddArticle}>
              <span>ADD +</span>
            </button>
          </div>

          <div className="buttons">

            <button className="action-button" onClick={() => setShowUpdateDiv(true)} style={{ display: showUpdateDiv ? 'none' : 'block' }}>
              <span>Update +</span>
            </button>
            {showUpdateDiv && (
            <div className='update-div'>
              <div className='article-id'>Aricle Id - ${data['_id']}</div>
              <div className='text-area-update'>
                <textarea value={updatedArticle} className="text-area" placeholder="type here...." name="postContent" onChange={(e)=> setUpdatedArticle(e.target.value)}/>
                <i onClick={handleUpdate} className=" check ri-check-line"></i>
              </div>
            </div>
            )}
            <div className='article-id'>Add Count - {counts['addCount']} , Update Count - {counts['updateCount']}</div>
          </div>

        </div>

        
        </Panel>
        
      </PanelGroup>
  </div>
  );
};

export default App;
