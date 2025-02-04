export default function Pagination({ nextPage, previousPage, currentPage, totalPages }) {
    return (
        <nav>
            <div className="d-flex justify-content-center">
                <ul className="pagination d-flex justify-content-between align-items-center">
                    <li className={`Page-item ${currentPage > 1 ? "" : "disabled"}`}>
                        <a href="#" className="page-link" onClick={previousPage}>Geri</a>
                    </li>
                    <span className="current-page mx-4 fs-5 text-primary">{currentPage}</span>
                    <li className={`Page-item ${currentPage >= totalPages ? "disabled" : ""}`}>
                        <a href="#" className="page-link" onClick={nextPage}>İleri</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}