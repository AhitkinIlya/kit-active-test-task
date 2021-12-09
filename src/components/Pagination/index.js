import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate'
import ShowFiles from '../ShowFiles'
import DropZone from '../DropZone'
import { connect } from 'react-redux'

import './Pagination.scss'

const Pagination = ({ files }) => {

  const location = useLocation()
  //Количество на каждой вкладке Пагинации
  let itemsPerPage = 4;

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);


  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    //Рассчитывает сколько и каких файлов отображать
    //Передается currentItems в DropZone и ShowFiles компоненты
    setCurrentItems(files.slice(itemOffset, endOffset));
    //Рассчитывает сколько станиц пагинации будет
    setPageCount(Math.ceil(files.length / itemsPerPage));
  }, [itemOffset, files]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage % files.length;

    setItemOffset(newOffset);
  };

  //В зависимости от адресного пути рендерить нужный компонент
  // У боих компонентов одна и тот же компонент Пагинации
  return (
    <>   
      {location.pathname === '/' ? <DropZone currentItems={currentItems} /> : <ShowFiles currentItems={currentItems} />}
      {files.length > itemsPerPage ?
              <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
            : null
      }
    </>
  );
}

const mapStateToProps = state => ({
  files: state.files.files
})

export default connect(mapStateToProps, null)(Pagination)