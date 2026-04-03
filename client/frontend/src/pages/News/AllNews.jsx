import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllNews } from "../../redux/actions/newsActions";
import { reset } from "../../redux/slice/newsSlice";
import { FiCalendar, FiEye } from "react-icons/fi";
import "./News.css";

const AllNews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { news, pagination, loading } = useSelector((state) => state.news);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllNews({ page: currentPage, limit: 12 }));
    dispatch(reset());
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Hero Section */}
      <div className="news-hero">
        <div className="news-hero-overlay"></div>
        <div className="hero-content">
          <h1>Latest News & Updates</h1>
          <p>
            Stay informed about our hospital's latest achievements and events
          </p>
        </div>
      </div>

      {/* News Grid Section */}
      <div className="news-section">
        <div className="news-section-container">
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading news...</p>
            </div>
          ) : news?.length === 0 ? (
            <div className="empty-state">
              <p>No news articles found. Check back later!</p>
            </div>
          ) : (
            <>
              <div className="news-grid">
                {news?.map((item) => (
                  <div
                    className="news-card"
                    key={item._id}
                    onClick={() => navigate(`/news/${item.slug}`)}
                  >
                    <div className="news-image">
                      <img
                        src={`data:image/jpeg;base64,${item.image}`}
                        alt={item.title}
                      />
                      <div className="news-category">{item.category}</div>
                    </div>
                    <div className="news-content">
                      <h3>{item.title}</h3>
                      <div className="news-meta">
                        <span className="meta-date">
                          <FiCalendar />
                          {formatDate(item.publishedDate)}
                        </span>
                        <span className="meta-views">
                          <FiEye />
                          {item.views} views
                        </span>
                      </div>
                      <p>{item.excerpt}</p>
                      <button className="read-more-btn">Read More →</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="page-btn"
                  >
                    Previous
                  </button>

                  {[...Array(pagination.totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    // Show first, last, and pages around current
                    if (
                      pageNum === 1 ||
                      pageNum === pagination.totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`page-btn ${
                            currentPage === pageNum ? "active" : ""
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (
                      (pageNum === currentPage - 2 && currentPage > 3) ||
                      (pageNum === currentPage + 2 &&
                        currentPage < pagination.totalPages - 2)
                    ) {
                      return (
                        <span key={pageNum} className="page-dots">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages}
                    className="page-btn"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AllNews;
