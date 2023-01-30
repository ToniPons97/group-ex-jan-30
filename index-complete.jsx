import React from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

import { retext } from "retext";
import retextPos from "retext-pos";
import retextKeywords from "retext-keywords";
import { toString } from "nlcst-to-string";

const KEYWORDS_DATA = "keywords_data";

async function extractKeywords(text) {
  let keywords = [];
  let toProcess = await retext()
    .use(retextPos)
    .use(retextKeywords)
    .process(text);

  toProcess.data.keywords.forEach((kw) => {
    keywords.push(toString(kw.matches[0].node));
  });
  return keywords;
}

function Posts({ data }) {
  return (
    <div className={styles.data_container}>
      {data.map((elem, i) => (
        <div key={i + "root-div"} className={styles.data_item}>
          <p>{elem.text}</p>
          <div>{elem.keywords}</div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const inputRef = useRef();
  const [data, setData] = useState([]);

  // saves data to localstorage
  useEffect(() => {
    if (data.length !== 0) {
      localStorage.setItem(KEYWORDS_DATA, JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem(KEYWORDS_DATA)) || []);
  }, []);

  const inputHandler = async (ev) => {
    let v = inputRef.current.value;
    let toSave = { text: v, keywords: [], timestamp: Date.now() };
    toSave.keywords = await extractKeywords(v);
    setData([toSave, ...data]);
  };

  return (
    <div className={styles.main}>
      <div className={styles.main_content}>
        <textarea placeholder="Input text here." ref={inputRef}></textarea>
        <button onClick={inputHandler}>Save</button>
        <Posts data={data}></Posts>
      </div>
    </div>
  );
}
