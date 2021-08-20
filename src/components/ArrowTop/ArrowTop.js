import React from 'react';
import './ArrowTop.css';

function ArrowTop({isActiveArrowTop}) {

  const refScroll = React.useRef(null);

  function handleScrollTop() {
    window.scrollTo({top: 0, behavior:'smooth'});
  }

  return (
    <div ref={refScroll} className={`arrowTop ${isActiveArrowTop? "arrowTop_active" : ""}`} onClick={handleScrollTop}>
      <div className="arrowTop__container">
        <span className="arrowTop__item"></span>
      </div>
    </div>
  )
}

export default ArrowTop;