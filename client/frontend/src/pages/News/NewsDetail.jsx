import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getNewsBySlug, getLatestNews } from "../../redux/actions/newsActions";
import { reset } from "../../redux/slice/newsSlice";
import { FiCalendar, FiEye, FiArrowLeft, FiShare2 } from "react-icons/fi";
import "./News.css";

const NewsDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { newsItem, latestNews, loading } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getNewsBySlug(slug));
    dispatch(getLatestNews(5));
    dispatch(reset());
  }, [dispatch, slug]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: newsItem?.title,
        text: newsItem?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="not-found-container">
        <h2>News Not Found</h2>
        <p>The article you're looking for doesn't exist.</p>
        <Link to="/news" className="back-btn">
          Back to News
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="news-detail-page">
        <div className="news-detail-container">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="back-to-list"
          >
            <FiArrowLeft />
            Back to News
          </button>

          <div className="news-detail-grid">
            {/* Main Content */}
            <div className="news-main">
              <div className="news-header">
                <span className="news-category-badge">{newsItem.category}</span>
                <h1>{newsItem.title}</h1>
                <div className="news-meta">
                  <span className="meta-date">
                    <FiCalendar />
                    {formatDate(newsItem.publishedDate)}
                  </span>
                  <span className="meta-views">
                    <FiEye />
                    {newsItem.views} views
                  </span>
                </div>
              </div>

              <div className="news-featured-image">
                <img
                  src={`data:image/jpeg;base64,${newsItem.image}`}
                  alt={newsItem.title}
                />
              </div>

              <div className="news-content-body">
                <p>{newsItem.content}</p>
              </div>

              <div className="news-footer">
                <button onClick={handleShare} className="share-btn">
                  <FiShare2 />
                  Share this article
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="news-sidebar">
              <div className="sidebar-widget">
                <h3>Latest News</h3>
                <ul className="latest-news-list">
                  {latestNews?.map((item) => (
                    <li key={item._id}>
                      <Link to={`/news/${item.slug}`}>
                        <div className="latest-news-image">
                          <img
                            src={`data:image/jpeg;base64,${item.image}`}
                            alt={item.title}
                          />
                        </div>
                        <div className="latest-news-content">
                          <h4>{item.title}</h4>
                          <span>{formatDate(item.publishedDate)}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-widget">
                <h3>Quick Links</h3>
                <ul className="quick-links">
                  <li>
                    <Link to="/doctors">Find a Doctor</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsDetail;
