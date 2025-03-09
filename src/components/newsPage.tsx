import React, { useEffect, useState } from "react";
import axios from "axios";

function NewsPage(props: any) {
  const { filters, submitButton, setSubmitButton } = props;
  const [newsData, setNewsData] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [noResult,setNoResult] = useState<boolean>(false)

  console.log("filters",filters)
  // Fetch the data
  useEffect(() => {
   
      fetchNews();
      if(submitButton){
      setSubmitButton(false); 
      }
    
  }, [submitButton]);

  const fetchNews = async (search?: string) => {
    let query = "q=top"; 

    const searchQuery = search ===""?null : searchText; 

    if (searchQuery) {
        query = `q=${searchQuery}`;
    }

    if (filters.categories && filters.categories.length > 0) {
        query = searchQuery
            ? `q=${searchQuery} AND ${filters.categories.join(" AND ")}`
            : `q=${filters.categories.join(" AND ")}`;
    }
console.log("filtersss", filters)
    const dateQuery = filters.fromDate && filters.toDate ? `&from=${filters?.fromDate}&to=${filters?.toDate}` : "";

    // const API_KEY = "6b4a07cc0abe4a318cf9a1741928ceb4";
    const API_KEY = "131226952015459d9cd14d30fb000969";

    const url = `https://newsapi.org/v2/everything?${query}${dateQuery}&language=en&apiKey=${API_KEY}`;

    try {
      const response = await axios.get(url);
      if (response?.data?.status === "ok") {
        setNewsData(response?.data?.articles);
      setNoResult(false)

      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setNoResult(true)
    }
};

  return (
    <div>
      {noResult?
      <div className="font-bold grid place-items-center text-black h-[calc(100vw-1000px)]"> No News Found!</div>
      :
      <>
      <div className="mb-4 w-[400px]">
  <input
    type="text"
    placeholder="Search news..."
    value={searchText}
    onChange={(e) => {
      setSearchText(e.target.value);
      if (e.target.value === "") {
        fetchNews(""); // Call API immediately when input is cleared
      }
    }}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        fetchNews(); // Call API with searchText when Enter is pressed
      }
    }}
    className="border p-2 w-full rounded-md shadow-sm"
  />
</div>

      {newsData.map((result: any, index: number) => (
        <div key={index} className="border-2 border-black rounded-lg p-4">
          <div className="font-bold text-2xl">{result.title}</div>
          <img src={result.urlToImage} alt="News" className="w-full h-[400px] mt-2" />
          <div> Author: {result.author}</div>
          <div> Published: {new Date(result.publishedAt).toLocaleString()}</div>
          <div>{result.description}</div>
        </div>
      ))}
</>

}
    </div>
  );
}

export default NewsPage;
