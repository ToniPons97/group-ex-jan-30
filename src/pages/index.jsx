import React from "react";
import Head from "next/head";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { retext } from "retext";
import retextPos from "retext-pos";
import retextKeywords from "retext-keywords";
import { toString } from "nlcst-to-string";


const Posts = ({ posts }) => {
  return (
    <div>
      {
        posts.map((post, i) => {
          return <div key={i} className='post'>
            <b>Post</b>
            <p>{post.text}</p>
            <br />
            <b>Keywords: </b>
            <ul>
              {
                post.keywords.map((p, i) => <li key={i}>{p}</li>)
              }
            </ul>
          </div>
        })
      }
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState([]);
  const inputRef = useRef(null);
  const KEY = 'keywords';

  const extractKeywords = async (text) => {
    let keywords = [];
    let v1 = await retext()
      .use(retextPos)
      .use(retextKeywords)
      .process(text);

    v1.data.keywords.forEach((keyword) => {
      keywords.push(toString(keyword.matches[0].node));
    });

    return keywords;
  }

  const handleInput = async () => {
    const paragraph = inputRef.current.value;
    const keywords = await extractKeywords(paragraph);
    setData(prev => [...prev, {text: paragraph, keywords: keywords, timestamp: Date.now()}]);
    inputRef.current.value = '';
  }

  useEffect(() => {
    if (data.length > 0)
      localStorage.setItem(KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    
    if (stored)
      setData(prev => JSON.parse(stored));
  }, []);


  return (
    <>
      <textarea ref={inputRef}></textarea>
      <button onClick={handleInput}>Save</button>
      <Posts posts={data} />
    </>
  );
}
