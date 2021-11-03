import axios from "axios";
import { useEffect, useState } from "react";
import PlaylistItem from "../component/PlaylistItem";
import * as classes from "../classes.module.css";

const BASE_URL =
  "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails%2Cstatus&maxResults=5&playlistId=UUTI5S0PqpgB0DbYgcgRU6QQ&key=";
const Playlist = () => {
  const [items, setItems] = useState([]);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (code) => {
    const pageToken = code ? `pageToken=${code}` : "";
    axios
      .get(`${BASE_URL}${process.env.REACT_APP_API_KEY}&${pageToken}`)
      .then(({ data }) => {
        const { items, nextPageToken, prevPageToken } = data;
        nextPageToken ? setNextPage(data.nextPageToken) : setNextPage(null);
        prevPageToken ? setPrevPage(prevPageToken) : setPrevPage(null);
        setItems(items);
      });
  };

  const handleClick = (direction) => {
    if (direction === "next") {
      fetchData(nextPage);
    } else {
      fetchData(prevPage);
    }
  };
  return (
    <div className={classes.wrapper}>
      <h1 style={{ marginBottom: "25px", textAlign: "center" }}>
        You-Tube Playlist For Growth Engineering
      </h1>
      {items.map((values) => (
        <PlaylistItem key={values.id} {...values} />
      ))}

      {items.length && (
        <ul
          className="pagination"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <li className={`page-item ${prevPage ? "" : "disabled"}`}>
            <button className="page-link" onClick={() => handleClick("back")}>
              Previous
            </button>
          </li>

          <li className={`page-item ${nextPage ? "" : "disabled"}`}>
            <button className="page-link" onClick={() => handleClick("next")}>
              Next
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Playlist;
